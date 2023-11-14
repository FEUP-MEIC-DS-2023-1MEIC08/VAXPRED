import { Component, Input } from '@angular/core';
import { Plugin } from '../../plugin';

@Component({
  selector: 'app-plugin-page-images',
  templateUrl: './plugin-page-images.component.html',
  styleUrls: ['./plugin-page-images.component.css']
})
export class PluginPageImagesComponent {
  @Input() plugin: Plugin = new Plugin(0, '', '', '');

  expandedImage: string | null = null;

  expandImage(imageUrl: string) {
    this.expandedImage = imageUrl;
  }

  closeExpandedImage() {
    this.expandedImage = null;
  }
}