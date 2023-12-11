import { Component, Input } from '@angular/core';
import { Plugin } from '../../plugin';

@Component({
  selector: 'app-plugin-page-menu',
  templateUrl: './plugin-page-menu.component.html',
  styleUrls: ['./plugin-page-menu.component.css']
})
export class PluginPageMenuComponent {
  @Input() selectedTab: number = 0;
  @Input() plugin: Plugin = new Plugin(0, '', '', '', '', '', new Date(), new Date(), '', [], 2, [], []);

  getFormattedFAQ(): string {
    const faqs = this.plugin.faq;
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
