import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PluginPageComponent } from './plugin-page/plugin-page.component';
import { Plugin } from './plugin';
import { SearchPageComponent } from './search-page/search-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog) { }
  title = 'VAXPRED';
  openDialog(): void { // TODO: THIS IS CALLED WITH HTML, INSERT IN PLUGIN LISTING IN STORE
    const dialogRef = this.dialog.open(PluginPageComponent, {
      width: '1000px',
      data: {
        dialogRef: null, // Initialize the dialogRef to null
        plugin: new Plugin(0, "Plugin title changed", "Plugin Description changed") // TODO: INSERT PLUGIN HERE!!!!
      }
    });
    dialogRef.componentInstance.data.dialogRef = dialogRef;
  }
}