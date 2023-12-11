import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { forkJoin,Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class ToolService {
  getTools(): import("./plugin").Plugin[] {
    throw new Error('Method not implemented.');
  }
	constructor(private http: HttpClient) { }

	
	/**
	* This function returns a list of get functions to be called in order to get all the categories, tags and plugins with the filters chosen by the user.
	*@param category categories chosen by the user.
	*@param  tag tags chosen by the user.
	*@returns  The function returns a forkjoin of all the get functions to be called.
	 */
	getFilteredResults(category: string, tag: string/*, searchQuery: string*/): Observable<any[]> {
		let categories=category.split(",");
		console.log("Tag: "+tag)
		// split the category into an array of strings
		let tags=tag.split(",");
		console.log("Tags: "+tags)
		console.log("Tags length: "+tags.length)

		console.log("Categories: "+categories)
		console.log("Categories length: "+categories.length)
		
		let requests_list = [];
		requests_list.push(this.getCategories());
		requests_list.push(this.getTags());
		if (category == "" && tag == ""/* && searchQuery == ""*/) {
			requests_list.push(this.getPlugins());
		} 
		if (categories.length > 0 && categories[0] != "") {
			for (let categ of categories) {
				requests_list.push(this.getPluginsByCategory(categ));
			}
		}
		if (tags.length > 0 && tags[0] != "") {
			for (let ta of tags) {
				requests_list.push(this.getPluginsByTag(ta));
			}
		}
		
	
		return forkJoin(requests_list);
	}

	/**
	 * Returns a list of all plugins
	 */
	getPlugins() { // no filter options
		return this.http.get('http://localhost:8000/plugins/');		
	}

	/**
	 * Returns a list of plugins filtered by category
	 */
	getPluginsByCategory(category: string) {
		return this.http.get('http://localhost:8000/categories/' + category + '/plugins/');
	}

	/**
	 * Returns a list of all plugins
	 */
	getPluginsByTag(tag: string) {
		return this.http.get('http://localhost:8000/tags/' + tag + '/plugins/');
	}
	
	/**
	 * Returns a plugin by id
	 */
	getPlugin(id: number) {
		return this.http.get('http://localhost:8000/plugins/' + id + '/');
	}

	getToolTypes(): string[] {
		return ['Data Quality', 'Data Curation', 'Synthetic Data Generation'];
	}

	/**
	 * Returns a list of all tags
	 */
	getTags(){
		return this.http.get("http://localhost:8000/tags/");
	}

	installPlugin(pluginId: number) {
		return this.http.post('http://localhost:8000/users/' + 3 + '/plugins/' + pluginId + '/associate/', {});
	}
	
	/**
	 * Returns a list of all categories
	 */
	getCategories(){
		return this.http.get('http://localhost:8000/categories/');
	}

	getCategoryPlugins(id: number) {
		//return this.http.get('http://localhost:8000/categories/' + plugin);
		return this.http.get('http://localhost:8000/categories/' + id + '/plugins/');
	}
}
