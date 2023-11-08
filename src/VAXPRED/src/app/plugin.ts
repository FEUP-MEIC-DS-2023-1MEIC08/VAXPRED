export class Plugin {
    id: number;
    title: string;
    description: string;
    contract: string;
    // Add other properties as needed
  
    constructor(id: number, title: string, description: string, contract: string) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.contract = contract;
    }
  }
  