import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  /**
   * stores the category selected by the user
   */
  selectedCategory: string = '';

  /**
   * stores the tag selected by the user
   */
  selectedTag: string = '';
  
  //searchQuery: string = ''; // TO BE IMPLEMENTED

  constructor(private route: ActivatedRoute) { }
  
  /**
   * Subscribes to the query parameters and stores the selected category and tag
   */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['categories'] || '';
      //console.log("Categories in searchpage: "+this.selectedCategory)
      //console.log(this.selectedCategory);
      this.selectedTag = params['tags'] || ""; // 
      //console.log("Tags in searchpage: "+this.selectedTag)
      //console.log(this.selectedTag);
      /*  this.searchQuery = params['searchQuery'] || ''; */
    });
  }
}
