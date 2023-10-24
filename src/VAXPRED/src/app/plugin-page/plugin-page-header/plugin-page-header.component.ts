import { Component, Input } from '@angular/core';
import { Plugin } from '../../plugin';

@Component({
  selector: 'app-plugin-page-header',
  templateUrl: './plugin-page-header.component.html',
  styleUrls: ['./plugin-page-header.component.css']
})
export class PluginPageHeaderComponent {
  @Input() plugin: Plugin = new Plugin(0, '', '');

}
