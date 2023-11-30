import { Component, OnInit, inject} from '@angular/core';
import { AdminPageService } from '../admin-page.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LiveAnnouncer} from '@angular/cdk/a11y';
import { MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(
    private adminPageService: AdminPageService,
    private dialog: MatDialog
  ) { }

  plugins: any[] = [];

  categories: any[] = [];
  tags: any[] = [];
  allTags: any;

  pluginData = {
    name: "",
    version: "",
    description: "",
    developer: "",
    supplier_name: "",
    supplier_email: "",
    contract_duration: 0
  };

  pluginCategoryID = -1;

  ngOnInit(): void {
    console.log("init");

    this.adminPageService.getAllPlugins().subscribe((data: any[]) => {
      console.log(data);
      this.plugins = data;
    });

    this.adminPageService.getAllCategories().subscribe((data: any[]) => {
      console.log('categories: ', data);
      this.categories = data;
    });
  }

  removePlugin(plugin: any) {
    this.adminPageService.removePlugin(plugin.id).subscribe((data) => {
      console.log(data);
      // Refresh the page
      window.location.reload();
    })
  }

  openConfirmationDialog(plugin: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '35em',
      data: { pluginName: plugin.name }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked "Yes" in the confirmation dialog, remove the plugin
        this.removePlugin(plugin);
      }
    });
  }

  announcer = inject(LiveAnnouncer);

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

  addPlugin() {
    if (this.pluginData.name == "") return
    if (this.pluginData.description == "") return
    if (this.pluginCategoryID == -1) return
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

  getTagId(tagName: string): number | null {
    const foundTag = this.allTags.tags.find((tag: { name: string; }) => tag.name.toLowerCase() === tagName.toLowerCase());
    return foundTag ? foundTag.id : null;
  }
}
