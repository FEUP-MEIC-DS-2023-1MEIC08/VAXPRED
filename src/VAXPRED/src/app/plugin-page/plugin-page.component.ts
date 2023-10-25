import { Component, Inject } from '@angular/core';
import { Plugin } from '../plugin';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-plugin-page',
  templateUrl: './plugin-page.component.html',
  styleUrls: ['./plugin-page.component.css']
})
export class PluginPageComponent {
  selectedTab: number = 0;

  plugin: Plugin = new Plugin(0, "Plugin Title", "Plugin Description");
  constructor(
    public dialogRef: MatDialogRef<PluginPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialogRef: MatDialogRef<PluginPageComponent> }
  ) {}
}

