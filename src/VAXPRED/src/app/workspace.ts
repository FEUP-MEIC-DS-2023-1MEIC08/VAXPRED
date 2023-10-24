export class Workspace {
    id: number;
    title: string;
    description: string;
    type: string;
    //users
    // Add other properties as needed
  
    constructor(id: number, title: string, description: string, type: string) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.type=type;
    }
  }
  