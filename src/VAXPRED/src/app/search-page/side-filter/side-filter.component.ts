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
	/**
	 * stores the list of plugins meant to be displayed
	 */
	items: Plugin[] = [];
	
	/**
	 * stores the original list of plugins
	 */
	originalItems: Plugin[] = [];
	
	/**
	 * stores the sorting option selected
	 * @default 'original'
	 * @see toggleSorting()
	 */
	sortingOption: string = 'original';
	
	/**
	 * stores whether the sorting option has been selected
	 * @default false
	 * @see toggleSorting()
	 */
	isRadioSelected: boolean = false;
	
	/**
	 * stores the list of tool categories meant to be displayed
	 */
	toolCategories: string[] = [];

	/**
	 * keeps track of the tool initial categories selected
	 */
	lastToolCategories: { [key: string]: boolean } = {};

	/**
	 * keeps track of the currents tool categories selected
	 */
	selectedToolCategories:{ [key: string]: boolean } = {};

	/**
	 * stores the list of tags meant to be displayed
	 */
	tags: string[] = [];

	/**
	 * keeps track of the initial tags 
	 */
	lastTags: { [key: string]: boolean } = {};
	
	/**
	 * keeps track of the currents tags selected
	 */
	selectedTags: { [key: string]: boolean } = {};
	
	/**
	 * stores the tool category passed from the search page
	 */
	@Input() selectedCategory: string="";

	/**
	 * stores the tag passed from the search page
	 */
	@Input() selectedTag: string="";

	/**
	 * stores the search query passed from the search page // NOT IMPLEMENTED YET
	 */
	//@Input() searchQuery: string="";

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
		this.toolService.getFilteredResults(this.selectedCategory,this.selectedTag).subscribe(
			(results: any[]) => {
				// Empty the variables
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
				// Fill the variables
				this.toolCategories=this.toolService.getToolCategories();
			  	for (const result of results){
				
				/*   if (result.categories) {
					  // Handle the response with categories
					 
					  for (let category of result.categories) {
						//console.log("Category: " + category.name);
						  this.toolCategories.push(category.name);
					  }
					} else */ 
					if (result.tags) {
					  // Handle the response with tags
					  
					  for (let tag of result.tags) {
						  this.tags.push(tag.name);
					  }
					} else if (result.plugins) {
					  // Handle the response with plugins
					 
					  for(let plugin of result.plugins){
						
						// if item with that id already exists, pass, else add it
						if (!this.items.some(item => item.id === plugin.id)) {						
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
								  plugin.category,
								  plugin.changelog,
								  plugin.tags,
								  plugin.contract_duration,
								  plugin.faqs,
								  plugin.price
								  )
						  );}
						}
					} else {
					  console.log('Response with no data')	
					}
				}
				this.originalItems = this.items.slice();
				
				// Sees if there was a selected category
				if (this.selectedCategory != "") {
					let categories = this.selectedCategory.split(",");
					for (let category of categories){
						// switch - to space and make the fist letter of each word uppercase
						let auxcategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
						this.lastToolCategories[auxcategory] = true;
						this.selectedToolCategories[auxcategory] = true;
					}
					for (const category of this.toolCategories) {
						if (!this.selectedToolCategories[category]) {
							this.lastToolCategories[category] = false;
							this.selectedToolCategories[category] = false;
						}
					}
				}
				// Sees if there was a selected tag
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
				// If there was a selected category and a selected tag, filter the list
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
			if (this.lastToolCategories[category] !== this.selectedToolCategories[category] && this.selectedToolCategories[category]) {
				found = true;
			}
		}	
		for (const tag of Object.keys(this.selectedTags)) {
			if (this.lastTags[tag] !== this.selectedTags[tag] && this.selectedTags[tag]) {
				found = true;
			}
		}
		return found;
	}

	/**
	 * Updates the selected tools categories
	 * @returns tool categories in string concatenated with commas
	 */
	sendSelectedToolCategories(): string {
		// return the selected tool categories in string concatenated with commas
		let aux: string[] = [];
		for (const category of Object.keys(this.selectedToolCategories)) {
			if (this.selectedToolCategories[category]) {
				let categoryValue = category.toLowerCase().replace(/ /g, '-');
				aux.push((categoryValue));
			}
		}
		return aux.join(',');
	}

	/**
	 * Updates the selected tags 
	 * @returns tags in string concatenated with commas
	 */
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
		const selectedCategories = Object.keys(this.lastToolCategories).filter((type) => this.lastToolCategories[type]);
		const selectedTags = Object.keys(this.lastTags).filter((tag) => this.lastTags[tag]);
		this.items = this.originalItems.filter((item: Plugin) => {
			const typeMatch = selectedCategories.length === 0 || selectedCategories.includes(item.category);
			const tagMatch = selectedTags.length === 0 || item.tags.some((tag) => selectedTags.includes(tag));
			return typeMatch && tagMatch;
		});
	}

	/**
	 * Navigate to the search page with the selected tool categories and tags
	 */
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
