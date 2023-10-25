import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PluginPageComponent } from './plugin-page/plugin-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog) { }
  title = 'VAXPRED';
  openDialog(): void {
    const dialogRef = this.dialog.open(PluginPageComponent, {
      width: '1000px',
      data: {
        dialogRef: null, // Initialize the dialogRef to null
      }
    });
    dialogRef.componentInstance.data.dialogRef = dialogRef;
  }
}
