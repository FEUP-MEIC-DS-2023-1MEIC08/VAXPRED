import { Component, OnInit, Inject, inject} from '@angular/core';
import { Plugin } from '../plugin';
import { AdminPageService } from '../admin-page.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LiveAnnouncer} from '@angular/cdk/a11y';
import { MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-admin-page-plugin-form',
  templateUrl: './admin-page-plugin-form.component.html',
  styleUrls: ['./admin-page-plugin-form.component.css']
})
export class AdminPagePluginFormComponent implements OnInit {
  constructor(
    private adminPageService: AdminPageService,
    public dialogRef: MatDialogRef<AdminPagePluginFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialogRef: MatDialogRef<AdminPagePluginFormComponent, any>; editingPlugin: Plugin },
  ) { }

  categories = ['Data Quality', 'Data Curation', 'Synthetic Data Generation']
  dependencies: any[] = [];
  faqs: any[] = [];
  tags: any[] = [];
  allTags: any;

  pluginData = {
    id: -1,
    name: "",
    version: "",
    description: "",
    developer: "",
    supplier_name: "",
    supplier_email: "",
    contract_duration: 0,
    price: 0,
    category: "",
    changelog: "",
    dependencies: this.dependencies,
    faqs: this.faqs
  };

  newTagInput = "";

  announcer = inject(LiveAnnouncer);

  ngOnInit(): void {
    if (this.data.editingPlugin) {
      console.log(this.data.editingPlugin)
      this.pluginData.id = this.data.editingPlugin.id;
      this.pluginData.name = this.data.editingPlugin.name;
      this.pluginData.version = this.data.editingPlugin.version;
      this.pluginData.description = this.data.editingPlugin.description;
      this.pluginData.developer = this.data.editingPlugin.developer;
      this.pluginData.contract_duration = this.data.editingPlugin.contract_duration;
      this.pluginData.category = this.data.editingPlugin.category; 
      this.pluginData.changelog = this.data.editingPlugin.changelog;
      this.pluginData.dependencies = this.data.editingPlugin.dependencies;
      this.pluginData.faqs = this.data.editingPlugin.faq;
    }
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`removed ${tag}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  addInputToChipGrid() {
    if (this.newTagInput) {
      this.tags.push(this.newTagInput);
      this.newTagInput = '';
    }
  }

  postPlugin() {
    if (this.pluginData.name == "") return
    if (this.pluginData.version == "") return
    if (this.pluginData.description == "") return
    if (this.pluginData.developer == "") return
    if (this.pluginData.category == "") return
    if (this.pluginData.changelog == "") return

    if (this.data.editingPlugin == null) {
      if (this.pluginData.supplier_name == "") return
      if (this.pluginData.supplier_email == "") return
      // Create new plugin
      this.adminPageService.addPlugin(this.pluginData).subscribe(
        // Success creating new plugin
        (response) => {
          console.log('Response:', response);
          let pluginID = response.id
          // Get all Tags
          this.adminPageService.getTags().subscribe((data) => {
            this.allTags = data;

            for (let tag of this.tags) {
              // Find Tag ID if exists else null
              let tagID = this.getTagId(tag);

              // If doesnt exist create Tag and associate with plugin
              if (tagID == null) {
                this.adminPageService.createTag({"name": tag}).subscribe(
                  (response) => {
                    console.log('Response:', response);
                    this.adminPageService.associateTag(pluginID, response.id).subscribe((data) => {
                      console.log(data)
                    })
                  },
                  (error) => {
                    console.log('Error: ', error)
                  }
                )
              } else {
                this.adminPageService.associateTag(pluginID, tagID).subscribe((data) => {
                  console.log(data)
                })
              }
            }
            //window.location.reload();
          });
        },
        // Error creating new plugin
        (error) => {
          console.log('Error: ', error)
        }
      )
    }
    else {
      // Update existing plugin
      let pluginID = this.data.editingPlugin.id;
      this.adminPageService.editPlugin(pluginID, this.pluginData).subscribe(
        (response) => {
          console.log('Response:', response);
          this.adminPageService.getTags().subscribe((data) => {
            this.allTags = data;
            for (let tag of this.tags) {
              let tagID = this.getTagId(tag);
              if (tagID == null) {
                this.adminPageService.createTag({"name": tag}).subscribe(
                  (response) => {
                    console.log('Response:', response);
                    this.adminPageService.associateTag(pluginID, response.id).subscribe((data) => {
                      console.log(data)
                    })
                  },
                  (error) => {
                    console.log('Error: ', error)
                  }
                )
              } else {
                this.adminPageService.associateTag(pluginID, tagID).subscribe((data) => {
                  console.log(data)
                })
              }
            }
            window.location.reload();
          });
        },
        (error) => {
          console.log('Error: ', error)
        }
      )
    }


  }

  getTagId(tagName: string): number | null {
    const foundTag = this.allTags.tags.find((tag: { name: string; }) => tag.name.toLowerCase() === tagName.toLowerCase());
    return foundTag ? foundTag.id : null;
  }

  closeDialog() {
    this.data.dialogRef.close();
  }
}
