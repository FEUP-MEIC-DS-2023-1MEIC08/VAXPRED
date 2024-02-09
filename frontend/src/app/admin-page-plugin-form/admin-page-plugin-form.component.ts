import { Component, OnInit, Inject, inject} from '@angular/core';
import { Plugin } from '../plugin';
import { AdminPageService } from '../admin-page.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LiveAnnouncer} from '@angular/cdk/a11y';
import { MatChipInputEvent} from '@angular/material/chips';

/**
 * Component representing the form for editing or adding plugins from the store through the admin page.
 */
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

  /** Holds all categories available. */
  categories = ['Data Quality', 'Data Curation', 'Synthetic Data Generation']
  /** Holds all dependencies. */
  dependencies: any[] = [];
  /** Holds all dependencies. */
  faqs: Object[] = [];
 /** Holds selected tags. */
  tags: any[] = [];
 /** Holds all available tags. */
  allTags: any;
  /** Holds all tags that will be removed. */
  TagsToRemove: any[] = [];

 /** Data structure for plugin information. */
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
    faqs: this.faqs,
  };


  /** Input for new tags. */
  newTagInput = "";

  /** Instance of LiveAnnouncer for accessibility announcements. */
  announcer = inject(LiveAnnouncer);

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    if (this.data.editingPlugin) {
      console.log("plugin:", this.data.editingPlugin)
      this.TagsToRemove = [];
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
      this.tags = JSON.parse(JSON.stringify(this.data.editingPlugin.tags))

      if ('supplier_email' in this.data.editingPlugin)
        this.pluginData.supplier_email = this.data.editingPlugin.supplier_email as string;
      if ('supplier_name' in this.data.editingPlugin)
        this.pluginData.supplier_name = this.data.editingPlugin.supplier_name as string;
      if ('faqs' in this.data.editingPlugin)
        this.pluginData.faqs = this.data.editingPlugin.faqs as Array<Object>;

    }
  }

  /**
   * Removes a tag from the list of tags.
   * @param tag The tag to be removed.
   */
  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.TagsToRemove.push(tag);
      console.log(this.TagsToRemove)
      this.announcer.announce(`removed ${tag}`);
    }
  }

  /**
   * Adds a tag to the list of tags.
   * @param event The MatChipInputEvent containing the added value.
   */
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  /**
   * Adds the new tag input to the tag grid.
   */
  addInputToChipGrid() {
    if (this.newTagInput) {
      this.tags.push(this.newTagInput);
      this.newTagInput = '';
    }
  }

  /**
   * Posts the plugin data.
   */
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
                    //console.log('Response:', response);
                    this.adminPageService.associateTag(pluginID, response.id).subscribe((data) => {
                      //console.log(data)
                    })
                  },
                  (error) => {
                    console.log('Error: ', error)
                  }
                )
              } else {
                this.adminPageService.associateTag(pluginID, tagID).subscribe((data) => {
                  //console.log(data)
                })
              }
            }
            setTimeout(() => { window.location.reload(); }, 500);
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
        // Success editing plugin
        (response) => {
          console.log('Response:', response);
          this.adminPageService.getTags().subscribe((data) => {
            this.allTags = data;

            for (let tag of this.TagsToRemove) {
              let tagID = this.getTagId(tag)

              if (tagID != null) {
                this.adminPageService.disassociateTag(pluginID, tagID).subscribe((data) => {
                  console.log("Disassociating ", tag, data)
                })
              }
            }

            let newTags = this.tags.filter(tag => !this.data.editingPlugin.tags.includes(tag))
            console.log(newTags)

            for (let tag of newTags) {
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
            setTimeout(() => { window.location.reload(); }, 500);
          });
        },
        (error) => {
          console.log('Error: ', error)
        }
      )
    }


  }

  /**
   * Retrieves the ID of a tag by name.
   * @param tagName The name of the tag to search.
   * @returns The ID of the tag if found, otherwise null.
   */
  getTagId(tagName: string): number | null {
    const foundTag = this.allTags.tags.find((tag: { name: string; }) => tag.name.toLowerCase() === tagName.toLowerCase());
    return foundTag ? foundTag.id : null;
  }

  /**
   * Closes the form.
   */
  closeDialog() {
    this.data.dialogRef.close();
  }
}
