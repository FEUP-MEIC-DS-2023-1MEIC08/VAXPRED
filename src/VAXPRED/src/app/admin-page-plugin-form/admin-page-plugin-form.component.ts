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
  categories: any[] = [];
 /** Holds selected tags. */
  tags: any[] = [];
 /** Holds all available tags. */
  allTags: any;

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
    changelog: ""
  };

  /** ID of the plugin's category. */
  pluginCategoryID = -1;

  // TODO: supplier_name and supplier_email are not in the plugin model
  // TODO: fix category selection because a plugin can have more than 1 category !!! (outdated)

  /** Input for new tags. */
  newTagInput = "";

  /** Instance of LiveAnnouncer for accessibility announcements. */
  announcer = inject(LiveAnnouncer);

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    this.adminPageService.getAllCategories().subscribe((data: any[]) => {
      console.log('categories: ', data);
      this.categories = data;
    });

    if (this.data.editingPlugin) {
      this.pluginData.id = this.data.editingPlugin.id;
      this.pluginData.name = this.data.editingPlugin.name;
      this.pluginData.version = this.data.editingPlugin.version;
      this.pluginData.description = this.data.editingPlugin.description;
      this.pluginData.developer = this.data.editingPlugin.developer;
      // this.pluginData.supplier_name = this.data.editingPlugin.supplier_name;
      // this.pluginData.supplier_email = this.data.editingPlugin.supplier_email;
      this.pluginData.contract_duration = this.data.editingPlugin.contract_duration;
      this.pluginCategoryID = 1; // TEMP
      this.pluginData.changelog = this.data.editingPlugin.changelog;
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
    if (this.pluginData.description == "") return
    if (this.pluginData.developer == "") return
    // if (this.pluginData.supplier_name == "") return
    // if (this.pluginData.supplier_email == "") return
    if (this.pluginCategoryID == -1) return

    if (this.data.editingPlugin == null) {
      // Create new plugin
      this.adminPageService.addPlugin(this.pluginData).subscribe(
        (response) => {
          console.log('Response:', response);
          let pluginID = response.id
          this.adminPageService.associateCategory(pluginID, this.pluginCategoryID).subscribe((data) => {
            console.log(data)
          });
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
    else {
      // Update existing plugin
      let pluginID = this.data.editingPlugin.id;
      this.adminPageService.editPlugin(pluginID, this.pluginData).subscribe(
        (response) => {
          console.log('Response:', response);
          this.adminPageService.associateCategory(pluginID, this.pluginCategoryID).subscribe((data) => {
            console.log(data)
          });
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
