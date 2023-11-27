import { Component, OnInit } from '@angular/core';
import { Plugin } from 'src/app/plugin';
import { ToolService } from 'src/app/plugin.service';

@Component({
	selector: 'app-side-filter',
	templateUrl: './side-filter.component.html',
	styleUrls: ['./side-filter.component.css']
})
export class SideFilterComponent {
	items: Plugin[] = [];
	originalItems: Plugin[] = [];
	sortingOption: string = 'original';
	isRadioSelected: boolean = false;
	toolTypes: string[] = [];
	selectedToolTypes: { [key: string]: boolean } = {};
	tags: string[] = [];
	selectedTags: { [key: string]: boolean } = {};

	constructor(private toolService: ToolService)
	{
		this.toolService.getPlugins().subscribe((data: any) => {
			data.plugins.forEach((plugin: any) => {
				this.items.push(
					new Plugin(
						plugin.id,
						plugin.name,
						plugin.description,
						'assets/img/ydata.png', // plugin.image,
						plugin.version,
						plugin.developer,
						new Date(plugin.release_date),
						new Date(plugin.last_update_date),
						'Data Quality',			// plugin.type,
						[],		//plugin.tags
						plugin.contract_duration,
						[]		//plugin.faqs
					));
			});

			this.originalItems = this.items.slice();
		});

		this.toolTypes = this.toolService.getToolTypes();
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

	checkTag(item: Plugin): boolean {
		for (const tag of item.tags) {
			if (this.selectedTags[tag]) {
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

		this.items = this.originalItems.filter((item: Plugin) => {
			const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(item.type);
			const tagMatch = selectedTags.length === 0 || item.tags.some((tag) => selectedTags.includes(tag));
			return typeMatch && tagMatch;
		});
	}
}
