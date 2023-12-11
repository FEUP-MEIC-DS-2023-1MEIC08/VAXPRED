import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugin } from 'src/app/plugin';
import { ToolService } from 'src/app/plugin.service';
import { Router } from '@angular/router';

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
	
	toolCategories: string[] = [];
	lastToolCategories: { [key: string]: boolean } = {};
	selectedToolCategories:{ [key: string]: boolean } = {};

	tags: string[] = [];
	lastTags: { [key: string]: boolean } = {};
	selectedTags: { [key: string]: boolean } = {};
	
	@Input() selectedCategory: string="";
	@Input() selectedTag: string="";
	@Input() searchQuery: string="";

	constructor(private toolService: ToolService, private router: Router, private route: ActivatedRoute) {}
	
	/**
	 * Constructs the list of categories, tags and plugins meant to be displayed
	 */
	ngOnInit() {
		this.fetch();
	}

	/**
	 * Re-constructs the list of categories, tags and plugins meant to be displayed
	 */
	ngOnChanges() {
		this.fetch();
	}

	/**
	 * Fetches the list of categories, tags and plugins meant to be displayed
	 */
	fetch(){
		this.items = [];
		this.originalItems = [];
		this.sortingOption = 'original';
		this.isRadioSelected = false;

		this.toolCategories = [];
		this.lastToolCategories = {};
		this.selectedToolCategories = {};

		this.tags = [];
		this.lastTags = {};
		this.selectedToolCategories = {};

		this.toolService.getFilteredResults(this.selectedCategory,this.selectedTag).subscribe(
			(results: any[]) => {
			  for (const result of results){
				  if (result.categories) {
					  // Handle the response with categories
					  //console.log('Response with categories:', result.categories);
					  for (let category of result.categories) {
						  this.toolCategories.push(category.name);
					  }
					} else if (result.tags) {
					  // Handle the response with tags
					  //console.log('Response with tags:', result.tags);
					  for (let tag of result.tags) {
						  this.tags.push(tag.name);
					  }
					} else if (result.plugins) {
					  // Handle the response with plugins
					  //console.log('Response with plugins:', result.plugins);
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
								  plugin.categories,
								  plugin.price
								  )
						  );}
					  
					} else {
					  console.log('Response with no data')	
					}
			  }
			  this.originalItems = this.items.slice();
  
			  if (this.selectedCategory != "") {
				  let categories = this.selectedCategory.split(",");
				  for (let category of categories){
					  this.lastToolCategories[this.toolCategories[Number(category)-1]] = true;
					  this.selectedToolCategories[this.toolCategories[Number(category)-1]] = true;
				  }
				  for (const category of this.toolCategories) {
					  if (!this.selectedToolCategories[category]) {
						  this.lastToolCategories[category] = false;
						  this.selectedToolCategories[category] = false;
					  }
				  }
			  }
			  if (this.selectedTag != "") {
				  let tags = this.selectedTag.split(",");
				  for (let tag of tags) {
					  this.lastTags[this.tags[Number(tag)-1]] = true;
					  this.selectedTags[this.tags[Number(tag)-1]] = true;
				  }
				  for (const tag of this.tags) {
					  if (!this.selectedTags[tag]) {
						  this.lastTags[tag] = false;
						  this.selectedTags[tag] = false;
					  }
				  }
			  }
			  if ((this.selectedTag != "") && (this.selectedCategory != "")) {
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

	/**
	 * Indicates whether the selected tools categories or tags have changed
	 * @returns **true** if there is a difference, **false** otherwise
	 */
	foundDifference(): boolean {
		let found = false;
		for (const category of Object.keys(this.selectedToolCategories)) {
			if (this.lastToolCategories[category] !== this.selectedToolCategories[category]) {
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

	sendSelectedToolCategories(): string {
		// return the selected tool categories in string concatenated with commas
		let aux: string[] = [];
		for (const category of Object.keys(this.selectedToolCategories)) {
			if (this.selectedToolCategories[category]) {
				aux.push(String(this.toolCategories.indexOf(category)+1));
			}
		}
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
		return aux.join(',');
	}

	/**
	 * Filters the list based on the selected tool category and the tag
	 */
	filterList(): void {
		const selectedCategories =  Object.keys(this.lastToolCategories).filter((category) => this.lastToolCategories[category]);
		const selectedTags = Object.keys(this.lastTags).filter((tag) => this.lastTags[tag]);
		
		this.items = this.originalItems.filter((item: Plugin) => {
			const categoryMatch = selectedCategories.length === 0 || item.categories.some((category) => selectedCategories.includes(category));
			const tagMatch = selectedTags.length === 0 || item.tags.some((tag) => selectedTags.includes(tag));
			return categoryMatch && tagMatch;
		});
	}

	onSubmit() {
		let queryParams: { [key: string]: string } = {};

		if (this.sendSelectedToolCategories() != "") {
			queryParams['categories'] = this.sendSelectedToolCategories();
		}
		if (this.sendSelectedTags() != "") {
			queryParams['tags'] = this.sendSelectedTags();
		}

		this.router.navigate(['/search'], {
			relativeTo: this.route,
			queryParams: queryParams
		  });
	}
}
