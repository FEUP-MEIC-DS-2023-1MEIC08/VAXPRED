/**
 * @param {number} id the id of the plugin 
 * @param {string} name the name of the plugin 
 * @param {string} description what the plugin is about / what offers 
 * @param {string} logo the logotype image path of the plugin
 * @param {string} version the most recent version of the plugin
 * @param {string} developer the ones who created the plugin
 * @param {Date} release_date when the plugin was released
 * @param {Date} last_update_date when the last update was made
 * @param {string} type the type of the plugin 
 * @param {string[]} tags the tags of the plugin
 * @param {number} contract_duration the duration of the plugins's contract (in years)
 */
export class Plugin
{
	id: number;
	name: string;
	description: string;
	logo: string;
	images: string[];
	version: string;
	developer: string;
	release_date: Date;
	last_update_date: Date;
	type: string;
	type_icon!: string;
	type_description!: string;
	tags: string[];
	contract_duration: number;
	// TODO: connect to db
	dependencies: any[] = [
		{ name: 'Python', version: '3.9', vendor: 'Python Foundation' },
		{ name: 'Docker', version: '24.0', vendor: 'Docker Inc.' }
	];

	constructor(id: number, name: string, description: string, logo: string, version: string, 
		developer: string, release_date: Date, last_update_date: Date, type: string, tags: string[], contract_duration: number)
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
		//! TODO: connect to db (type and tags)
		this.type = type;
		this.tags = ['Linter', 'Debugger', 'Programming Languages'];
		this.contract_duration = contract_duration;
		
		this.assembleDynamicData();
	}

	assembleDynamicData()
	{
		const types_descriptions: any = 
		{
			'Data Quality': 'Data Quality: processes and technologies for identifying, \
				understanding and correcting flaws in data.',
			'Data Curation': 'Data Curation: the process of creating, organizing and \
				maintaining data sets so they can be accessed and used by people looking \
				for information.',
			'Synthetic Data Generation': 'Synthetic Data Generation: the process of generating \
				data by training an AI on real world data samples.'
		}
		
		this.type_icon = 'assets/plugin_types_icons/' + this.type + '.png';
		this.type_description = types_descriptions[this.type];
	}
}
