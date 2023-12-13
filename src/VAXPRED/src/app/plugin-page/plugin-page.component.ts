import { Component, Inject } from '@angular/core';
import { Plugin } from '../plugin';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToolService } from '../plugin.service';

@Component({
  selector: 'app-plugin-page',
  templateUrl: './plugin-page.component.html',
  styleUrls: ['./plugin-page.component.css']
})

/**
 * Class: PluginPageComponent
 * Purpose: Angular component responsible for displaying a plugin page within a dialog
 */
export class PluginPageComponent {

  /**
   * Property: selectedTab
   * Purpose: Holds the index of the selected tab (default value is 0)
   */
  selectedTab: number = 0;

  /**
   * Property: plugin
   * Purpose: Holds data related to the plugin being displayed on the page. Default value is an instance of Plugin with default values
   */
  plugin: Plugin = new Plugin(0, '', '', '', '', '', new Date(), new Date(), '','', [], 2, []);

  /**
   * Constructor: PluginPageComponent
   * Parameter dialogRef: Reference to the dialog instance to control the opening/closing of the dialog
   * Parameter data Data: injected into the dialog, containing references and plugin data
   * Parameter toolService: Service handling plugin-related tools and functionalities
 */
  constructor(
    public dialogRef: MatDialogRef<PluginPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialogRef: MatDialogRef<PluginPageComponent, any>; plugin: Plugin },
    toolService: ToolService
  ) {
    this.plugin = data.plugin;
  }

  /**
   * Method: closeDialog()
   * Purpose: Close the dialog when called
   */
  closeDialog() {
    this.data.dialogRef.close();
  }

}
