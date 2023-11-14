import { Component, Input } from '@angular/core';
import { Tool } from './tool';
import { MatDialog } from '@angular/material/dialog';
import { PluginPageComponent } from 'src/app/plugin-page/plugin-page.component';
import { Plugin } from 'src/app/plugin';
import { SearchPageComponent } from '../search-page.component';
import { ToolService } from 'src/app/tool.service';

@Component({
	selector: 'app-plugin-card',
	templateUrl: './plugin-card.component.html',
	styleUrls: ['./plugin-card.component.css']
})
export class PluginCardComponent {
	@Input() id: number = 0;
	@Input() tool: Tool = new Tool(0, '', '', '', '', []);

	constructor(public dialog: MatDialog, private service: ToolService) {

	}

	openDialog(): void { // TODO: THIS IS CALLED WITH HTML, INSERT IN PLUGIN LISTING IN STORE
		const dialogRef = this.dialog.open(PluginPageComponent, {
			width: '1000px',
			data: {
				dialogRef: null, // Initialize the dialogRef to null
				plugin: new Plugin(this.tool.id, 'Plugin Title', 'Plugin Description') // TODO: INSERT PLUGIN HERE!!!!
			}
		});
		dialogRef.componentInstance.data.dialogRef = dialogRef;
	}
}
