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
				const index = Math.floor(Math.random() * 3);
				
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
						['Data Quality', 'Data Curation', 'Synthetic Data Generation'][index],
						plugin.tags,
						plugin.contract_duration,
						plugin.faqs
					));
			});

			this.originalItems = this.items.slice();
		});

		this.toolTypes = this.toolService.getToolTypes();
		this.tags = this.toolService.getTags();
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

  categories = ['Placeholder 1', 'Placeholder 2', 'Placeholder 3'];
  elements = [
    ['Element 1.1', 'Element 1.2', 'Element 1.3', 'Element 1.4', 'Element 1.5', 'Element 1.6', 'Element 1.7', 'Element 1.8'],
    ['Element 2.1', 'Element 2.2', 'Element 2.3'],
    ['Element 3.1', 'Element 3.2', 'Element 3.3']
  ];
  testTags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9'];


}
