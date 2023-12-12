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
		const getPluginRequest = this.http.get('http://localhost:8000/plugins/' + id + '/');

		getPluginRequest.subscribe(() => {
			// Log the installation action to Kafka here
			this.logToKafka2('Plugin accessed', id); // Pass user and plugIn information
		});

		return getPluginRequest;
		
	}

	getToolTypes(): string[] {
		return ['Data Quality', 'Data Curation', 'Synthetic Data Generation'];
	}

	getTags(): string[] {
		return ['Tag 1', 'Tag 2', 'Tag 3'];
	}

	installPlugin(userId: number, userName: string, pluginId: number, pluginName: string) {
		// First, perform the HTTP request to install the plugin
		const installRequest = this.http.post('http://localhost:8000/users/' + 3 + '/plugins/' + pluginId + '/associate/', {});

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
}
