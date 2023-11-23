import { Component } from '@angular/core';
import { Plugin } from 'src/app/plugin';
import { ToolService } from 'src/app/plugin.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent {
  categories = ['Placeholder 1', 'Placeholder 2', 'Placeholder 3'];
  elements = [
    ['Element 1.1', 'Element 1.2', 'Element 1.3', 'Element 1.4', 'Element 1.5', 'Element 1.6', 'Element 1.7', 'Element 1.8'],
    ['Element 2.1', 'Element 2.2', 'Element 2.3'],
    ['Element 3.1', 'Element 3.2', 'Element 3.3']
  ];
  tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9'];
}
