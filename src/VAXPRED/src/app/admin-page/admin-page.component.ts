import { Component, OnInit } from '@angular/core';
import { AdminPageService } from '../admin-page.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(
    private adminPageService: AdminPageService
  ) { }

  plugins: any[] = [];

  ngOnInit(): void {
    console.log("init");

    this.adminPageService.getAllPlugins().subscribe((data: any[]) => {
      console.log(data);
      this.plugins = data;
    });
  }

}
