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
	toolCategories: string[] = [];
	selectedToolCategories: { [key: string]: boolean } = {};
	tags: string[] = [];
	selectedTags: { [key: string]: boolean } = {};

	constructor(private toolService: ToolService) {
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
						plugin.changelog,
						plugin.tags,
						plugin.contract_duration,
						plugin.faqs
					));
			});

			this.originalItems = this.items.slice();
		});

		this.toolCategories = this.toolService.getToolCategories();
		this.tags = this.toolService.getTags();
	}


  	/**
	 * Filters the list based on the selected tool category and the tag
	 */
	filterList(): void {
		const selectedCategories = Object.keys(this.selectedToolCategories).filter((category) => this.selectedToolCategories[category]);
		const selectedTags = Object.keys(this.selectedTags).filter((tag) => this.selectedTags[tag]);

		this.items = this.originalItems.filter((item: Plugin) => {
			const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.category);
			const tagMatch = selectedTags.length === 0 || item.tags.some((tag) => selectedTags.includes(tag));
			return categoryMatch && tagMatch;
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
