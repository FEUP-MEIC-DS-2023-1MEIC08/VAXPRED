import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugin } from 'src/app/plugin';
import { ToolService } from 'src/app/plugin.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { forkJoin } from 'rxjs';

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

	@Input() selectedCategory: string="";
	@Input() selectedTag: string="";
	@Input() searchQuery: string="";

	constructor(private toolService: ToolService) {}
	
	ngOnInit() {
		forkJoin([
		  this.toolService.getPlugins(),
		  this.toolService.getCategories()
		]).subscribe(
		  ([pluginsData, categoriesData]) => {
			//console.log(pluginsData)
			// Handle plugins data
			let jsonData = JSON.stringify(pluginsData);			
			jsonData=JSON.parse(jsonData).plugins
			for(let i =0;i <jsonData.length;i++){
				let plugin = jsonData[i]
				let pluginData = JSON.stringify(plugin);
				this.items.push(
					new Plugin(
					  JSON.parse(pluginData).id,
					  JSON.parse(pluginData).name,
					  JSON.parse(pluginData).description,
					  'assets/img/ydata.png', // plugin.image,
					  JSON.parse(pluginData).version,
					  JSON.parse(pluginData).developer,
					  new Date(JSON.parse(pluginData).release_date),
					  new Date(JSON.parse(pluginData).last_update_date),
					  'Data Quality', // plugin.type,
					  [], //plugin.tags
					  JSON.parse(pluginData).contract_duration
					) )
			}
			this.originalItems = this.items.slice();

			// Handle categories data
			let categoryJsonData = JSON.stringify(categoriesData);
			categoryJsonData=JSON.parse(categoryJsonData).categories

		 	for(let i =0; i <categoryJsonData.length; i++){
				let category = categoryJsonData[i]
				let categoryData = JSON.stringify(category);
				this.toolTypes.push(JSON.parse(categoryData).name);
			} 
			
			this.tags = this.toolService.getTags();
			
			if (this.selectedTag != "") {
				this.selectedTags[this.selectedTag] = true;
				this.filterList();
			}

			// Filter the list based on the selected category
			if (this.selectedCategory != "") {
			  this.selectedToolTypes[this.selectedCategory] = true;
			  this.filterList();
			}
		  },
		  (error) => {
			console.error('Error loading data:', error);
		  }
		);
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
