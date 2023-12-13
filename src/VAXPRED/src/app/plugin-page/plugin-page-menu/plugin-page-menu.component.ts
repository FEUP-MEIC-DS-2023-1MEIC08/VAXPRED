import { Component, Input } from '@angular/core';
import { Plugin } from '../../plugin';

/**
 * @Component for PluginPageMenuComponent
 * Angular component responsible for displaying a menu of a plugin page
 */
@Component({
  selector: 'app-plugin-page-menu',
  templateUrl: './plugin-page-menu.component.html',
  styleUrls: ['./plugin-page-menu.component.css']
})

export class PluginPageMenuComponent {

  /**
   * Holds the index of the selected tab (default value is 0)
   */
  @Input() selectedTab: number = 0;

  /**
   * Holds data related to the plugin being displayed on the page. Default value is an instance of Plugin with default values
   */
  @Input() plugin: Plugin = new Plugin(0, '', '', '', '', '', new Date(), new Date(), '','', [], 2, []);

  /**
   * Returns an HTML-formatted string containing questions in bold and their corresponding answers separated by line breaks, using the 'plugin' property of the class
   * @returns HTML-formatted string containing formatted FAQs
   */
  getFormattedFAQ(): string {
    const faqs = this.plugin.faq;
    
    /**
     * Formats the FAQs from the plugin object into an HTML string
     * @returns HTML-formatted string with FAQs
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
