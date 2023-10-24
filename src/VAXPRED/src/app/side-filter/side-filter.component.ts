import { Component } from '@angular/core';
import { Workspace } from '../workspace';
import { WorkspaceService } from '../workspace.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.css']
})
export class SideFilterComponent {
  items: Workspace[] = [];
  originalItems: Workspace[] = [];
  sortingOption: string = 'original';
  isRadioSelected: boolean = false;
  toolTypes: string[]=[];
  selectedToolTypes: { [key: string]: boolean } = {};

  constructor(private workspaceService: WorkspaceService, private route: ActivatedRoute) {
    this.items = this.workspaceService.getWorkspaces().slice();
    this.toolTypes=this.workspaceService.getToolTypes();
    this.originalItems = this.items.slice();
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
      this.items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortingOption === 'zToA') {
      this.items.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      this.resetListToInitialFormat();
    }
  }

  /**
   * Filters the list based on the selected tool type
   */
  filterList(): void {
    if (Object.values(this.selectedToolTypes).every((value: boolean) => !value)) {
      this.items = this.originalItems.slice();
    } else {
      this.items = this.originalItems.filter((item: Workspace) => {
        return this.selectedToolTypes[item.type];
      });
    }
  }
}
