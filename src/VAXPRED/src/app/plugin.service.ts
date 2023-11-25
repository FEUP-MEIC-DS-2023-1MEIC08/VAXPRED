import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ToolService {
	constructor(private http: HttpClient) { }

	getPlugins() {
		return this.http.get('http://localhost:8000/plugins/');
	}
	
	getPlugin(id: number) {
		return this.http.get('http://localhost:8000/plugins/' + id + '/');
	}

	getToolTypes(): string[] {
		return ['Data Quality', 'Data Curation', 'Synthetic Data Generation'];
	}

	getTags(){
		//return this.http.get("localhost:8000/tags/");
		return ['Tag 1', 'Tag 2', 'Tag 3'];
	}

	installPlugin(pluginId: number) {
		return this.http.post('http://localhost:8000/users/' + 3 + '/plugins/' + pluginId + '/associate/', {});
	}
	
	getCategories(){
		return this.http.get('http://localhost:8000/categories/');
	}

	getCategoryPlugins(id: number) {
		//return this.http.get('http://localhost:8000/categories/' + plugin);
		return this.http.get('http://localhost:8000/categories/' + id + '/plugins/');
	}
}
