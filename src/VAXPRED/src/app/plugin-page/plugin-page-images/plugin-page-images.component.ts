import { Component, Input } from '@angular/core';
import { Plugin } from '../../plugin';

/**  
 * @Component for PluginPageImagesComponent
 * Angular component responsible for displaying images of a plugin page
 */
@Component({
  selector: 'app-plugin-page-images',
  templateUrl: './plugin-page-images.component.html',
  styleUrls: ['./plugin-page-images.component.css']
})
export class PluginPageImagesComponent {
  /** 
   * Holds data related to the plugin being displayed on the page. Default value is an instance of Plugin with default values
   */
  @Input() plugin: Plugin = new Plugin(0, '', '', '', '', '', new Date(), new Date(), '','', [], 2, []);

  /** 
   * Holds the URL of the image being expanded (default value is null)
   */
  expandedImage: string | null = null;

  /** 
   * Holds the index of the selected tab (default value is 0)
   * @param imageUrl URL of the image to be expanded
   */
  expandImage(imageUrl: string) {
    this.expandedImage = imageUrl;
  }

  /**
   * Closes the expanded image
   */
  closeExpandedImage() {
    this.expandedImage = null;
  }
}