import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugin } from 'src/app/plugin';
import { ToolService } from 'src/app/plugin.service';
import { MatGridListModule } from '@angular/material/grid-list';

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
	lastToolTypes: { [key: string]: boolean } = {};
	selectedToolTypes:{ [key: string]: boolean } = {};

	tags: string[] = [];
	lastTags: { [key: string]: boolean } = {};
	selectedTags: { [key: string]: boolean } = {};
	
	@Input() selectedCategory: string="";
	@Input() selectedTag: string="";
	@Input() searchQuery: string="";

	constructor(private toolService: ToolService,private route: ActivatedRoute) {}
	
	/**
	 * Constructs the list of categories, tags and plugins meant to be displayed
	 */
	ngOnInit() {
		this.toolService.getFilteredResults(this.selectedCategory,this.selectedTag).subscribe(
		  (results: any[]) => {
			
			console.log(results)
			for (const result of results){
				console.log(result)
				if (result.categories) {
					// Handle the response with categories
					console.log('Response with categories:', result.categories);
					for (let category of result.categories) {
						this.toolTypes.push(category.name);
					}
				  } else if (result.tags) {
					// Handle the response with tags
					console.log('Response with tags:', result.tags);
					for (let tag of result.tags) {
						this.tags.push(tag.name);
					}
				  } else if (result.plugins) {
					// Handle the response with plugins
					console.log('Response with plugins:', result.plugins);
					for(let plugin of result.plugins){
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
								plugin.type,
								plugin.tags,
								plugin.contract_duration,
								plugin.faq,
								plugin.price
								)
						);}
					
				  } else{
					console.log('Response with no data')	
				  }
			}
			this.originalItems = this.items.slice();

			if (this.selectedCategory != "") {
				let categories = this.selectedCategory.split(",");
				for (let category of categories){
					this.lastToolTypes[this.toolTypes[Number(category)-1]] = true;
					this.selectedToolTypes[this.toolTypes[Number(category)-1]] = true;
				}
			}
			if (this.selectedTag != "") {
				let tags = this.selectedTag.split(",");
				for (let tag of tags) {
					this.lastTags[this.tags[Number(tag)-1]] = true;
					this.selectedTags[this.tags[Number(tag)-1]] = true;
				}
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
		//this.filterList();
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

	/**
	 * Indicates whether the selected tools types or tags have changed
	 * @returns **true** if there is a difference, **false** otherwise
	 */
	foundDifference(): boolean {
		let found = false;
		for (const type of Object.keys(this.selectedToolTypes)) {
			if (this.lastToolTypes[type] !== this.selectedToolTypes[type]) {
				found = true;
			}
		}
		for (const tag of Object.keys(this.selectedTags)) {
			if (this.lastTags[tag] !== this.selectedTags[tag]) {
				found = true;
			}
		}
		return found;
	}

	sendSelectedToolTypes(): string {
		// return the selected tool types in string concatenated with commas
		let aux: string[] = [];
		for (const type of Object.keys(this.selectedToolTypes)) {
			if (this.selectedToolTypes[type]) {
				console.log("Index")
				console.log(this.toolTypes.indexOf(type))
				aux.push(String(this.toolTypes.indexOf(type)+1));
			}
		}
		console.log('Selected tool types:');
		console.log(aux);
		return aux.join(',');
	}

	sendSelectedTags(): string {
		// return the selected tags in string concatenated with commas
		let aux: string[] = [];
		for (const tag of Object.keys(this.selectedTags)) {
			if (this.selectedTags[tag]) {
				aux.push(String(this.tags.indexOf(tag)+1));
			}
		}
		console.log('Selected tags:');
		console.log(aux);
		return aux.join(',');
	}
}
