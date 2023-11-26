import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ToolService {
  getTools(): import("./plugin").Plugin[] {
    throw new Error('Method not implemented.');
  }
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

	getTags(): string[] {
		return ['Tag 1', 'Tag 2', 'Tag 3'];
	}

	installPlugin(pluginId: number) {
		return this.http.post('http://localhost:8000/users/' + 3 + '/plugins/' + pluginId + '/associate/', {});
	}

	getFAQ(pluginId: number): Observable<any> {
		return this.http.get('http://localhost:8000/faqs/' + pluginId + '/');			
	}
	
	/*
	getFAQ(pluginId: number): Observable<string[]> {
		return this.http.get('http://localhost:8000/faqs/' + pluginId + '/').pipe(
			map((response: any) => {
			  // Assuming the response contains an array of strings under a certain property
			  // Adjust this according to your actual API response structure
			  return response.data.map((item: any) => item.text);
			  // Above assumes 'data' is an array of objects, and 'text' is a property containing strings
			}));
	}
	*/
	
}
