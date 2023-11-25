import { Component } from '@angular/core';
import { Plugin } from 'src/app/plugin';
import { ToolService } from 'src/app/plugin.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent {

    items: Plugin[] = [];
	tags: string[] = [];
	// a tuple with category name and id
	categories: [string,number][] = [];
	categoryPlugins: { [categoryId: number]: Plugin[] } = {};
  constructor(private toolService: ToolService)
	{
		
		this.tags = this.toolService.getTags();

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

		console.log(this.categories);
		console.log("Oi")
		
	}

	getPluginsByCategory(categoryId: number){
		
		let items: Plugin[] = [];
		
		this.toolService.getCategoryPlugins(categoryId).subscribe((data: any) => {
			data.plugins.forEach((plugin: any) => {
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
						'Data Quality',			// plugin.type,
						[],		//plugin.tags
						plugin.contract_duration
					));
			});
		});
		this.categoryPlugins[categoryId] = items;
	
	
	}	 

	

  	
  //categories = ['Placeholder 1', 'Placeholder 2', 'Placeholder 3'];
  elements = [
    ['Element 1.1', 'Element 1.2', 'Element 1.3', 'Element 1.4', 'Element 1.5', 'Element 1.6', 'Element 1.7', 'Element 1.8'],
    ['Element 2.1', 'Element 2.2', 'Element 2.3'],
    ['Element 3.1', 'Element 3.2', 'Element 3.3']
  ];
  testTags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9'];


}
function sleep(arg0: number) {
	throw new Error('Function not implemented.');
}

