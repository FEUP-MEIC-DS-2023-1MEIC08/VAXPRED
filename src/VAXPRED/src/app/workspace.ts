export class Workspace {
    id: number;
    title: string;
    description: string;
    //users
    // Add other properties as needed
  
    constructor(id: number, title: string, description: string) {
      this.id = id;
      this.title = title;
      this.description = description;
    }
  }
  