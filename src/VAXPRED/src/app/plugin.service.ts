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
		let tags=tag.split(",");
		
		let requests_list = [];
		//requests_list.push(this.getCategories());
		requests_list.push(this.getTags());
		
		if (category == "" && tag == ""/* && searchQuery == ""*/) {
			requests_list.push(this.getPlugins());
		} 
		if (categories.length > 0 && categories[0] != "") {
			for (let categ of categories) {
				requests_list.push(this.getCategoryPlugins(categ));
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
	 * @returns {Observable<any>} the list of plugins
	 */
	getPlugins() { // no filter options
		return this.http.get('http://localhost:8000/plugins/');		
	}

	/**
	 * Returns a list of plugins filtered by category
	 * @param {string} category the category to filter by
	 * @returns {Observable<any>} the list of plugins
	 */
	getPluginsByCategory(category: string) {
		return this.http.get('http://localhost:8000/categories/' + category + '/plugins/');
	}

	/**
	 * Returns a list of all plugins
	 * @param {string} tag the tag to filter by
	 * @returns {Observable<any>} the list of plugins
	 */
	getPluginsByTag(tag: string) {
		return this.http.get('http://localhost:8000/tags/' + tag + '/plugins/');
	}
	
	/**
	 * Returns a plugin by id
	 * @param {number} id the id of the plugin
	 * @returns {Observable<any>} the plugin
	 */
	getPlugin(id: number) {
		return this.http.get('http://localhost:8000/plugins/' + id + '/');
	}

	getToolCategories(): string[] {
		return ['Data Quality', 'Data Curation', 'Synthetic Data Generation'];
	}

	/**
	 * Returns a list of all tags
	 * @returns {Observable<any>} the list of tags
	 */
	getTags(){
		return this.http.get("http://localhost:8000/tags/");
	}

	installPlugin(pluginId: number) {
		return this.http.post('http://localhost:8000/users/' + 3 + '/plugins/' + pluginId + '/associate/', {});
	}
	
	/**
	 * Returns a list of all categories
	 * @returns {Observable<any>} the list of categories
	 */
	getCategories(){
		return this.http.get('http://localhost:8000/categories/');
	}

	/**
	 * Returns a list of plugins filtered by category
	 * @param {string} category the category to filter by
	 * @returns {Observable<any>} the list of plugins
	 */
	getCategoryPlugins(category: string) {
		//return this.http.get('http://localhost:8000/categories/' + plugin);
		return this.http.get('http://localhost:8000/plugins/category/' + category );
	}
}
