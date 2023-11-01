import { Component } from '@angular/core';
import { Tool } from './tool';
import { ToolService } from '../tool.service';

@Component({
  selector: 'app-plugin-card',
  templateUrl: './plugin-card.component.html',
  styleUrls: ['./plugin-card.component.css']
})
export class PluginCardComponent
{
	tool: Tool;

	constructor(private service: ToolService,tool: Tool)
	{
		this.tool = tool;
	}
}
