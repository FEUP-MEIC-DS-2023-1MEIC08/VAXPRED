import { Component, Inject } from '@angular/core';
import { Plugin } from '../plugin';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToolService } from '../plugin.service';

/**
 * @Component for PluginPageComponent
 * Angular component responsible for displaying a plugin page within a dialog
 */
@Component({
  selector: 'app-plugin-page',
  templateUrl: './plugin-page.component.html',
  styleUrls: ['./plugin-page.component.css'],
})

export class PluginPageComponent {

  /**
   * Holds the index of the selected tab (default value is 0)
   */
  selectedTab: number = 0;

  /**
   * Holds data related to the plugin being displayed on the page. Default value is an instance of Plugin with default values
   */
  plugin: Plugin = new Plugin(
    0,
    '',
    '',
    '',
    '',
    '',
    new Date(),
    new Date(),
    '',
    '',
    [],
    2,
    []
  );

  /**
   * Constructor for PluginPageComponent
   * @param dialogRef Reference to the dialog instance to control the opening/closing of the dialog
   * @param data Data injected into the dialog, containing references and plugin data
   * @param toolService Service handling plugin-related tools and functionalities
   */
  constructor(
    public dialogRef: MatDialogRef<PluginPageComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dialogRef: MatDialogRef<PluginPageComponent, any>;
      plugin: Plugin;
    },
    toolService: ToolService
  ) {
    this.plugin = data.plugin;
  }

  /**
   * Close the dialog when called
   */
  closeDialog() {
    this.data.dialogRef.close();
  }
}
