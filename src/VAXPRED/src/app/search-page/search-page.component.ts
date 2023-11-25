import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  selectedCategory: string = '';
  selectedTag: string = ''; // not used 
  searchQuery: string = ''; //not used

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['categories'] || '';
     /*  this.selectedTag = params['tag'] || ""; // 
      this.searchQuery = params['searchQuery'] || ''; */
    });
  }
}
