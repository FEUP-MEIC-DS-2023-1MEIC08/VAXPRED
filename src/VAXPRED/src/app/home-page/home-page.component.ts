import { Component } from '@angular/core';
import { Plugin } from 'src/app/plugin';
import { ToolService } from 'src/app/plugin.service';


@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})


export class HomePageComponent {
	
	/**
	 * stores the list of plugins meant to be displayed
	*/
    items: Plugin[] = [];
	
	/**
	 * list of tags meant to be displayed
	 */
	//tags: {[key:number]:string} = {};
	tags : string[]= [];
	tagsIds: string[]= [];
	/**
	 * list of categories meant to be displayed
	 */
	categories: string[] = [];

	/**
	 * list of plugins for each category
	 */
	categoryPlugins: { [category: string]: Plugin[] } = {};

	categoryValues: { [category: string]: string } = {};
	
    constructor(private toolService: ToolService) {
		
		//this.tags = ['Tag1','Tag2','Tag3']
		this.toolService.getTags().subscribe( (data: any) => {
			data.tags.forEach((tag:any) => {
				//this.tags[tag.id] = tag.name;
				this.tags.push(tag.name);
				this.tagsIds.push(tag.id);
			});
		});
		console.log("tags:",this.tags);
		


		// Fill the list of plugins and categories
		this.categories = this.toolService.getToolCategories();
		for (let category of this.categories) {
			let categoryValue = category.toLowerCase().replace(/ /g, '-');
			this.categoryValues[category] = categoryValue;
			this.getPluginsByCategory(category,categoryValue);
		}

	 	/* this.toolService.getCategories().subscribe( (data: any) => {
			data.categories.sort((a: any, b: any) => {
				if (a.name === 'Other') {
				  return 1; // Move "Others" to the end
				} else if (b.name === 'Other') {
				  return -1; // Move "Others" to the end
				} else {
				  return a.name.localeCompare(b.name);
				}
			  }); 
			data.categories.forEach((category: any) => {
				this.categories.push([category.name, category.id]);
				this. (category.id);
			});
		}); */
	}

	/**
	 * Get the plugins for a given category
	 */
	getPluginsByCategory(shownCategory: string,category: string){
		
		let items: Plugin[] = [];
		
		this.toolService.getCategoryPlugins(category).subscribe((data: any) => {
			data.plugins.forEach((plugin: any) => {
				if (items.length < 4) {
					items.push(
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
						));	
				}
			});
		});
		this.categoryPlugins[shownCategory] = items;
	}	 

  testTags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9'];

}
function sleep(arg0: number) {
	throw new Error('Function not implemented.');
}

