import { Component, Input } from '@angular/core';
import { Plugin } from '../../plugin';

@Component({
  selector: 'app-plugin-page-menu',
  templateUrl: './plugin-page-menu.component.html',
  styleUrls: ['./plugin-page-menu.component.css']
})

/**
 * Class: PluginPageMenuComponent
 * Purpose: Angular component responsible for displaying a menu of a plugin page
 */
export class PluginPageMenuComponent {

  /**
   * Input: selectedTab
   * Purpose: Holds the index of the selected tab (default value is 0)
   */
  @Input() selectedTab: number = 0;

  /**
   * Input: plugin
   * Purpose: Holds data related to the plugin being displayed on the page. Default value is an instance of Plugin with default values
   */
  @Input() plugin: Plugin = new Plugin(0, '', '', '', '', '', new Date(), new Date(), '','', [], 2, []);

  getFormattedFAQ(): string {
    const faqs = this.plugin.faq;
    /**
     * Method: formattedFAQs
     * Returns: HTML-formatted string containing questions in bold and their corresponding answers separated by line breaks, using the 'plugin' property of the class
     * Purpose: Format the FAQs from the plugin object into an HTML string
     * Parameters: None
    */
    const formattedFAQs = faqs.map((faq: any) => {
      const [question, answer] = [faq.question, faq.answer];
      if (question) {
        return `<strong>${question}</strong><br>${answer || ''}`;
      }
      return ''; 
    });
    return formattedFAQs.filter(Boolean).join('<br><br>');
  }
}
