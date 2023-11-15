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
	image: string;
	type: string;
	tags: string[];
	// TODO: connect to db
	dependencies: any[] = [
		{ name: 'Python', version: '3.9', vendor: 'Python Foundation' }, 
		{ name: 'Docker', version: '24.0', vendor: 'Docker Inc.' }
	];

	constructor(id: number, name: string, description: string, image: string, type: string, 
		tags: string[])
	{
		this.id = id;
		this.name = name;
		this.description = description;
		this.image = image;
		this.type = type;
		this.tags = tags;
	}
}
