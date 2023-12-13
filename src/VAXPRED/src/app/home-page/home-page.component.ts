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
	tags: string[] = [];
	
	/**
	 * list of categories meant to be displayed
	 */
	categories: [string,number][] = [];

	/**
	 * list of plugins for each category
	 */
	categoryPlugins: { [categoryId: number]: Plugin[] } = {};
	
    constructor(private toolService: ToolService) {
		
		this.tags = ['Tag1','Tag2','Tag3']
		// Fill the list of plugins and categories
	 	this.toolService.getCategories().subscribe( (data: any) => {
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
				this.getPluginsByCategory(category.id);
			});
		});

	}

	/**
	 * Get the plugins for a given category
	 */
	getPluginsByCategory(categoryId: number){
		
		let items: Plugin[] = [];
		
		this.toolService.getCategoryPlugins(categoryId).subscribe((data: any) => {
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
							plugin.type,
							plugin.tags,
							plugin.contract_duration,
							plugin.faqs,
							plugin.categories
						));	
				}
			});
		});
		this.categoryPlugins[categoryId] = items;
	}	 

  testTags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9'];

}
function sleep(arg0: number) {
	throw new Error('Function not implemented.');
}

