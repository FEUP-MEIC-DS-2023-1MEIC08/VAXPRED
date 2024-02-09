import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { forkJoin,Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
		return this.http.get(environment.vaxpredApiUrl + '/plugins/');
	}

	/**
	 * Returns a list of plugins filtered by category
	 * @param {string} category the category to filter by
	 * @returns {Observable<any>} the list of plugins
	 */
	getPluginsByCategory(category: string) {
		return this.http.get(environment.vaxpredApiUrl + '/categories/' + category + '/plugins/');
	}

	/**
	 * Returns a list of all plugins
	 * @param {string} tag the tag to filter by
	 * @returns {Observable<any>} the list of plugins
	 */
	getPluginsByTag(tag: string) {
		return this.http.get(environment.vaxpredApiUrl + '/tags/' + tag + '/plugins/');
	}

	/**
	 * Returns a plugin by id
	 * @param {number} id the id of the plugin
	 * @returns {Observable<any>} the plugin
	 */
	getPlugin(id: number) {
		const getPluginRequest = this.http.get(environment.vaxpredApiUrl + '/plugins/' + id + '/');

		getPluginRequest.subscribe(() => {
			// Log the installation action to Kafka here
			this.logToKafka2('Plugin accessed', id); // Pass user and plugIn information
		});

		return getPluginRequest;

	}

	getToolCategories(): string[] {
		return ['Data Quality', 'Data Curation', 'Synthetic Data Generation'];
	}

	/**
	 * Returns a list of all tags
	 * @returns {Observable<any>} the list of tags
	 */
	getTags(){
		return this.http.get("http://localhost:8123/tags/");
	}

	installPlugin(userId: number, userName: string, pluginId: number, pluginName: string) {
		// First, perform the HTTP request to install the plugin
		const installRequest = this.http.post(environment.vaxpredApiUrl + '/users/' + 3 + '/plugins/' + pluginId + '/associate/', {});

		// Then, log the installation action to Kafka
		installRequest.subscribe(() => {
			// Log the installation action to Kafka here
			this.logToKafka('Plugin installed', pluginId, pluginName, userId, userName); // Pass user and plugIn information
		});

		return installRequest;
	}

	private logToKafka(action: string, pluginId: number, pluginName:string, userId: number, userName: string) {
		// Perform an HTTP request to your server-side component that handles Kafka logging
		const kafkaLogRequest = this.http.post('http://localhost:3000/log-to-kafka', { action, pluginId, pluginName, userId, userName });

		// Subscribe to the Kafka logging HTTP request
		kafkaLogRequest.subscribe(
			() => {
				console.log('Successfully logged action to Kafka');
			},
			(error) => {
				console.error('Error logging action to Kafka:', error);
			}
		);
	}

	private logToKafka2(action: string, pluginId: number) {
		// Perform an HTTP request to your server-side component that handles Kafka logging
		const kafkaLogRequest = this.http.post('http://localhost:3000/log-to-kafka-2', { action, pluginId});

		// Subscribe to the Kafka logging HTTP request
		kafkaLogRequest.subscribe(
			() => {
				console.log('Successfully logged action to Kafka');
			},
			(error) => {
				console.error('Error logging action to Kafka:', error);
			}
		);
	}

	/**
	 * Returns a list of all categories
	 * @returns {Observable<any>} the list of categories
	 */
	getCategories(){
		return this.http.get(environment.vaxpredApiUrl + '/categories/');
	}

	/**
	 * Returns a list of plugins filtered by category
	 * @param {string} category the category to filter by
	 * @returns {Observable<any>} the list of plugins
	 */
	getCategoryPlugins(category: string) {
		//return this.http.get(environment.vaxpredApiUrl + '/categories/' + plugin);
		return this.http.get(environment.vaxpredApiUrl + '/plugins/category/' + category );
	}
}
