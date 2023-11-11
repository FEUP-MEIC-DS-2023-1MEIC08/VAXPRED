export class Plugin {
    id: number;
    title: string;
    description: string;
	// TODO: connect to db
	dependencies: any[] = [{name: 'Python', version:'3.9', vendor:'Python Foundation'}, {name: 'Docker', version:'24.0', vendor:'Docker Inc.'}];
  
    constructor(id: number, title: string, description: string) {
      this.id = id;
      this.title = title;
      this.description = description;
    }
  }
  