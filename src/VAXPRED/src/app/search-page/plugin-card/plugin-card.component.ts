import { Component, Input } from '@angular/core';
import { Tool } from './tool';
import { MatDialog } from '@angular/material/dialog';
import { PluginPageComponent } from 'src/app/plugin-page/plugin-page.component';
import { Plugin } from 'src/app/plugin';

@Component({
  selector: 'app-plugin-card',
  templateUrl: './plugin-card.component.html',
  styleUrls: ['./plugin-card.component.css']
})
export class PluginCardComponent
{
	@Input() tool: Tool = new Tool(0, '', '', '', '', []);
	constructor(public dialog: MatDialog){}

	openDialog(): void { // TODO: THIS IS CALLED WITH HTML, INSERT IN PLUGIN LISTING IN STORE
		const dialogRef = this.dialog.open(PluginPageComponent, {
		  width: '1000px',
		  maxHeight: '90vh',
		  data: {
			dialogRef: null, // Initialize the dialogRef to null
			plugin: new Plugin(this.tool.id, 'Plugin Title', 'Plugin Description', 'Plugin Version', 'Plugin Developer', new Date(), new Date()) // TODO: INSERT PLUGIN HERE!!!!
		  }
		});
		dialogRef.componentInstance.data.dialogRef = dialogRef;
	  }
}
