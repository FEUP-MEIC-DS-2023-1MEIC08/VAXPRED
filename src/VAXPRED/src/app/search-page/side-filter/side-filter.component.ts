import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tool } from '../plugin-card/tool';
import { ToolService } from 'src/app/tool.service';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.css']
})
export class SideFilterComponent {
  items: Tool[] = [];
  originalItems: Tool[] = [];
  sortingOption: string = 'original';
  isRadioSelected: boolean = false;
  toolTypes: string[]=[];
  selectedToolTypes: { [key: string]: boolean } = {};
  tags: string[] = [];
  selectedTags: { [key: string]: boolean } = {};
  constructor(private toolService: ToolService, private route: ActivatedRoute) {
    this.items = this.toolService.getTools().slice();
    this.toolTypes=this.toolService.getToolTypes();
    this.originalItems = this.items.slice();
    this.tags = this.toolService.getTags();
  }

  /**
   * Resets the list to the initial format
   */
  resetListToInitialFormat() {
    this.items = this.originalItems.slice();
    this.sortingOption = 'original';
    this.isRadioSelected = false;
    this.filterList();
   
  }

  /**
   * Sorts the list based on the selected option, either A-Z or Z-A
   */
  toggleSorting(): void {
    this.isRadioSelected = true;
    if (this.sortingOption === 'aToZ') {
      this.items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortingOption === 'zToA') {
      this.items.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      this.resetListToInitialFormat();
    }
  }

  checkTag(item: Tool) : boolean{
    for(const tag of item.tags){
      if(this.selectedTags[tag]){
        return true;
      }
    }
    return false;
  }

  /**
   * Filters the list based on the selected tool type and the tag
   */
  filterList(): void {
    const selectedTypes = Object.keys(this.selectedToolTypes).filter((type) => this.selectedToolTypes[type]);
    const selectedTags = Object.keys(this.selectedTags).filter((tag) => this.selectedTags[tag]);

    this.items = this.originalItems.filter((item: Tool) => {
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(item.type);
      const tagMatch = selectedTags.length === 0 || item.tags.some((tag) => selectedTags.includes(tag));
      return typeMatch && tagMatch;
    });
  }
}
