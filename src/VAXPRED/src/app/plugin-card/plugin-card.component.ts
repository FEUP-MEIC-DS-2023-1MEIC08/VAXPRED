import { Component, Input } from '@angular/core';
import { Tool } from './tool';

@Component({
  selector: 'app-plugin-card',
  templateUrl: './plugin-card.component.html',
  styleUrls: ['./plugin-card.component.css']
})
export class PluginCardComponent
{
	@Input() tool: Tool = new Tool(0, '', '', '', '');
}
