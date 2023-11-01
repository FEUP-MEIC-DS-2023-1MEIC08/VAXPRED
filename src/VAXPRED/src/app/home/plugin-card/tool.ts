/**
 * @param {number} id the id of the plugin 
 * @param {string} name the name of the plugin 
 * @param {string} image the image of the logo
 * @param {string} type the type of the plugin 
 * @param {string} description what the plugin is about / what offers 
 */
export class Tool
{
	id: number;
	image: string;
	name: string;
	type: string;
	description: string;

	constructor(id: number, name: string, image: string, type: string, description: string) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.image = image;
		this.description = description;
	}
}
