import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  constructor(private router: Router) {
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.pageRoute = router.url
      }
  });
  }
  pageRoute = this.router.url;

}
