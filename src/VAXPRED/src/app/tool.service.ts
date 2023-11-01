import { Injectable } from '@angular/core';
import { Tool } from './plugin-card/tool';

@Injectable({
	providedIn: 'root'
})
export class ToolService {
	list = [
		new Tool(1, 'YData', '', 'Synthetic Data Generation', 'Description 1'),
		new Tool(2, 'MOSTLY.AI', '', 'Synthetic Data Generation', 'Description 2'),
		new Tool(3, 'Sama', '', 'Synthetic Data Generation', 'Description 3'),
	];

	constructor() { }

	getTools(): Tool[] {
		return this.list;
	}

	getTool(id: number): Tool {
		return this.list.find((item: Tool) => item.id == id)!;
	}

	getToolTypes(): string[] {
		return ['Quality', 'Curation', 'Generation'];
	}
}
