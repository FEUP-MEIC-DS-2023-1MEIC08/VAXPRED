/**
 * @param {number} id the id of the plugin 
 * @param {string} name the name of the plugin 
 * @param {string} description what the plugin is about / what offers 
 * @param {string} image the logotype image path of the plugin
 * @param {string} type the type of the plugin 
 * @param {string[]} tags the tags of the plugin
 */
export class Plugin
{
	id: number;
	name: string;
	description: string;
	logo: string;
	version: string;
	developer: string;
	release_date: Date;
	last_update_date: Date;
	tags: string[];
	// TODO: connect to db
	dependencies: any[] = [
		{ name: 'Python', version: '3.9', vendor: 'Python Foundation' },
		{ name: 'Docker', version: '24.0', vendor: 'Docker Inc.' }
	];
	type: string;
	images: string[];

	constructor(id: number, name: string, description: string, logo: string, version: string, 
		developer: string, release_date: Date, last_update_date: Date, type: string, tags: string[])
	{
		this.id = id;
		this.name = name;
		this.description = description;
		this.logo = logo;
		this.version = version;
		this.developer = developer;
		this.release_date = release_date;
		this.last_update_date = last_update_date;
		this.images = [
			'http://placekitten.com/498/300',
			'http://placekitten.com/499/300',
			'http://placekitten.com/500/300',
			'http://placekitten.com/501/300',
			'http://placekitten.com/502/300',
		];
		this.type = type;
		this.tags = tags;
	}
}
