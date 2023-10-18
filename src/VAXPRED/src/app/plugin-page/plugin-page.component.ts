import { Component } from '@angular/core';
import { Plugin } from '../plugin';
import { ActivatedRoute } from '@angular/router';
import { PluginService } from '../services/plugin.service';

@Component({
  selector: 'app-plugin-page',
  templateUrl: './plugin-page.component.html',
  styleUrls: ['./plugin-page.component.css']
})
export class PluginPageComponent {
  id: number = 0;
  selectedTab: string = 'details'; // Default selected tab

  plugin : Plugin = new Plugin(0, "", "");
  constructor(private route: ActivatedRoute, private service: PluginService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.plugin = this.service.getPlugin(this.id);
    });
  }
  
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
