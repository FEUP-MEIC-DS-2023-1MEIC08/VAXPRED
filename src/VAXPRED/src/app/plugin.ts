/**
 * @param {number} id the id of the plugin
 * @param {string} name the name of the plugin
 * @param {string} description what the plugin is about / what offers
 * @param {string} logo the logotype image path of the plugin
 * @param {string} version the most recent version of the plugin
 * @param {string} developer the ones who created the plugin
 * @param {Date} release_date when the plugin was released
 * @param {Date} last_update_date when the last update was made
 * @param {string} category the category of the plugin
 * @param {string[]} tags the tags of the plugin
 * @param {Object[]} faq the FAQ of the plugin
 * @param {number} contract_duration the duration of the plugins's contract (in years)
 */

export class Plugin
{
	id: number;
	name: string;
	description: string;
	logo: string;
	images: string[];
	price!: number;
	version: string;
	developer: string;
	release_date: Date;
	last_update_date: Date;
	category: string;
	category_icon!: string;
	category_description!: string;
	tags: string[];
	contract_duration: number;
	// TODO: connect to db
	dependencies: any[] = [
		{ name: 'Python', version: '3.9', vendor: 'Python Foundation' },
		{ name: 'Docker', version: '24.0', vendor: 'Docker Inc.' }
	];
	faq: Object[];
	css_id!: string;

	constructor(id: number, name: string, description: string, logo: string, version: string, 
		developer: string, release_date: Date, last_update_date: Date, category: string, 
		tags: string[], contract_duration: number, faq: Object[], price?: number)
	{
		this.id = id;
		this.name = name;
		this.description = description;
		this.logo = logo;
		this.version = version;
		this.developer = developer;
		this.release_date = release_date;
		this.last_update_date = last_update_date;
		//! TODO: connect to db
		this.images = [
			'http://placekitten.com/498/300',
			'http://placekitten.com/499/300',
			'http://placekitten.com/500/300',
			'http://placekitten.com/501/300',
			'http://placekitten.com/502/300',
		];
		this.category = category;
		this.tags = tags;
		this.contract_duration = contract_duration;
		this.faq = faq;
		this.price = price ? price : 0;

		this.assembleDynamicData();
	}

	assembleDynamicData()
	{
		const categories_descriptions: any =
		{
			'Data Quality': 'Data Quality: processes and technologies for identifying, \
				understanding and correcting flaws in data.',
			'Data Curation': 'Data Curation: the process of creating, organizing and \
				maintaining data sets so they can be accessed and used by people looking \
				for information.',
			'Synthetic Data Generation': 'Synthetic Data Generation: the process of generating \
				data by training an AI on real world data samples.'
		}

		this.category_icon = 'assets/plugin_categories_icons/' + this.category + '.png';
		this.category_description = categories_descriptions[this.category];
		const css_ids: any =
		{
			'Data Quality': 'data-quality',
			'Data Curation': 'data-curation',
			'Synthetic Data Generation': 'synthetic-data-generation'
		}

		this.css_id = css_ids[this.category];
		this.price = Math.random() > 0.5 ? 20 + Math.floor(Math.random() * 3) * 10 - 0.01 : 0;
	}
}
