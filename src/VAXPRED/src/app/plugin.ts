export class Plugin {
  id: number;
  title: string;
  description: string;
  images: string[];

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.images = [
      'http://placekitten.com/300/300',
      'http://placekitten.com/301/301',
      'http://placekitten.com/302/302',
      'http://placekitten.com/303/303',
      'http://placekitten.com/304/304',
    ];
  }
}
