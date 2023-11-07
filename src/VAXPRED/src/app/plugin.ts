export class Plugin {
    id: number;
    title: string;
    description: string;
	// TODO: connect to db
	dependencies: any[] = [{name: 'python', version:'3.9'}, {name: 'docker', version:'24.0'}];
  
    constructor(id: number, title: string, description: string) {
      this.id = id;
      this.title = title;
      this.description = description;
    }
  }
  