import { Injectable } from '@angular/core';
import { Tool } from './home/plugin-card/tool';

@Injectable({
	providedIn: 'root'
})
export class ToolService {
	list = [
		new Tool(1, 'YData', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Generate synthetic data \
			that mimics the statistical properties and behaviour of the real data. Protect your sensitive data, \
			augment your datasets and improve efficiency of your models by replacing real data or enriching it with synthetic data'),
		new Tool(2, 'MOSTLY.AI', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Synthetic data looks and \
			feels like real data. With MOSTLY AI, you can make your synthetic data bigger, smaller, rebalanced, \
			or augmented to fill in missing data points. Learn more about '),
		new Tool(3, 'Sama', 'assets/img/ydata.png', 'Data Curation', 'Your ML model\'s success \
			requires more than data. It requires a trusted data curation, annotation & validation partner \
			capable of managing risk while providing proactive insights and predictability.'),
	];

	constructor() { }

	getTools(): Tool[] {
		return this.list;
	}

	getTool(id: number): Tool {
		return this.list.find((item: Tool) => item.id == id)!;
	}

	getToolTypes(): string[] {
		return ['Data Quality', 'Data Curation', 'Synthetic Data Generation'];
	}
}
