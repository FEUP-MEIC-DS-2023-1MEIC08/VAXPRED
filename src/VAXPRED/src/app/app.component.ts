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
}