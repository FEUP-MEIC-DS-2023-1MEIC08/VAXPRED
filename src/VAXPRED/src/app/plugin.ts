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
      'http://placekitten.com/598/300',
      'http://placekitten.com/599/300',
      'http://placekitten.com/600/300',
      'http://placekitten.com/601/300',
      'http://placekitten.com/602/300',
    ];
  }
}
