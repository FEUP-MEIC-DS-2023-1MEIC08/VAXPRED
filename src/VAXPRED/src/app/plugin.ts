export class Plugin {
  id: number;
  title: string;
  description: string;
	// TODO: connect to db
	dependencies: any[] = [{name: 'Python', version:'3.9', vendor:'Python Foundation'}, {name: 'Docker', version:'24.0', vendor:'Docker Inc.'}];
  images: string[];

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.images = [
      'http://placekitten.com/498/300',
      'http://placekitten.com/499/300',
      'http://placekitten.com/500/300',
      'http://placekitten.com/501/300',
      'http://placekitten.com/502/300',
    ];
  }
}
