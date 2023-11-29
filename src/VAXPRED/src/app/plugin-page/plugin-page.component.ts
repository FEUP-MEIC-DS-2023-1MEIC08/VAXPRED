import { Component, Inject } from '@angular/core';
import { Plugin } from '../plugin';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToolService } from '../plugin.service';

@Component({
  selector: 'app-plugin-page',
  templateUrl: './plugin-page.component.html',
  styleUrls: ['./plugin-page.component.css']
})
export class PluginPageComponent {
  selectedTab: number = 0;
  plugin: Plugin = new Plugin(0, '', '', '', '', '', new Date(), new Date(), '', [], 2, '');
  constructor(
    public dialogRef: MatDialogRef<PluginPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialogRef: MatDialogRef<PluginPageComponent, any>; plugin: Plugin },
    toolService: ToolService
  ) {
    this.plugin = data.plugin;
    toolService.getFAQ(this.plugin.id).subscribe((response: any) => {
      this.plugin.faq = '';
      response.faqs.forEach((faq: any) => {
        this.plugin.faq += faq.question + '\n' + faq.answer + '\n\n';
      })
    });
  }

  closeDialog() {
    this.data.dialogRef.close();
  }

}