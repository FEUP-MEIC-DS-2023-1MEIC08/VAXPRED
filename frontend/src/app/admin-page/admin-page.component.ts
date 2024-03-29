import { Component, OnInit, inject} from '@angular/core';
import { AdminPageService } from '../admin-page.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AdminPagePluginFormComponent } from '../admin-page-plugin-form/admin-page-plugin-form.component';

/**
 * Component representing the admin page.
 */
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

  /** Holds all plugins for the admin page. */
  plugins: any[] = [];

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    console.log("init");

    this.adminPageService.getAllPlugins().subscribe((data: any[]) => {
      console.log(data);
      this.plugins = data;
    });
  }

  /**
   * Removes a plugin from the store.
   * @param plugin The plugin to be removed.
   */
  removePlugin(plugin: any) {
    this.adminPageService.removePlugin(plugin.id).subscribe((data) => {
      console.log(data);
      // Refresh the page
      window.location.reload();
    })
  }

  /**
   * Opens a confirmation dialog before removing the plugin.
   * @param plugin The plugin to be confirmed for removal.
   */
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

  /**
   * Opens a form for editing or adding a plugin.
   * @param plugin The plugin to be edited or added.
   */
  openPluginForm(plugin: any): void {
    const dialogRef = this.dialog.open(AdminPagePluginFormComponent, {
			width: '1000px',
			maxHeight: '90vh',
			data: {
				dialogRef: null, // Initialize the dialogRef to null
        editingPlugin: plugin
			}
		});
		dialogRef.componentInstance.data.dialogRef = dialogRef;
  }
}
