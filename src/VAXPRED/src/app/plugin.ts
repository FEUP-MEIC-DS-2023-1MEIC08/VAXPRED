export class Plugin {
  id: number;
  title: string;
  description: string;
  version: string;
  developer : string;
  release_date: Date;
  last_update_date: Date;
	// TODO: connect to db
	dependencies: any[] = [{name: 'Python', version:'3.9', vendor:'Python Foundation'}, {name: 'Docker', version:'24.0', vendor:'Docker Inc.'}];
  images: string[];

  constructor(id: number, title: string, description : string, version: string, developer : string, release_date : Date, last_update_date : Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.version = version;
    this.developer = developer;
    this.release_date = release_date;
    this.last_update_date = last_update_date;
    this.images = [
      'http://placekitten.com/498/300',
      'http://placekitten.com/499/300',
      'http://placekitten.com/500/300',
      'http://placekitten.com/501/300',
      'http://placekitten.com/502/300',
    ];
  }
}
