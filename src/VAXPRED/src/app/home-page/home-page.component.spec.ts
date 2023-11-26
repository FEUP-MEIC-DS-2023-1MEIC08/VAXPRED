import { ComponentFixture, TestBed ,waitForAsync } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { ToolService } from 'src/app/plugin.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PluginCardComponent } from '../search-page/plugin-card/plugin-card.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (param: string) => 'mockValue',
      },
    },
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent,PluginCardComponent],
      providers: [ToolService,{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
      imports: [HttpClientModule,MatIconModule,RouterModule,MatDialogModule], 
      //schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));
  beforeEach(() => {
  
    
    
    let toolService = TestBed.inject(ToolService);

    let categoriesData={"categories":[{"id":1,"name":"Other"},{"id":2,"name":"Virus"},{"id":3,"name":"Bacteria"},{"id":4,"name":"DNA"},{"id":5,"name":"Machine Learning"}]}
    let pluginsData={"plugins":[{"id":1,"name":"ProductivityMaster","version":"3.0","description":"Boost your productivity with this amazing plugin","developer":"TechSolutions Inc.","release_date":"2023-11-13T16:36:42","last_update_date":"2023-11-13T16:36:42","supplier_name":"TechSolutions Inc.","supplier_email":"techsolutions@gmail.com","contract_duration":2},{"id":6,"name":"SocialConnect","version":"2.0","description":"Stay connected to your social networks with SocialConnect","developer":"SocialWare Inc.","release_date":"2023-11-13T16:36:42","last_update_date":"2023-11-13T16:36:42","supplier_name":"SocialWare Inc.","supplier_email":"socialware@gmail.com","contract_duration":null},{"id":11,"name":"TimeTracker Pro","version":"1.0","description":"Track your time efficiently with TimeTracker Pro","developer":"TimeTech Inc.","release_date":"2023-11-13T16:36:42","last_update_date":"2023-11-13T16:36:42","supplier_name":"TimeTech Inc.","supplier_email":"timetech@gmail.com","contract_duration":3},{"id":17,"name":"E-commerceOptimizer","version":"3.1","description":"Optimize your e-commerce business with E-commerceOptimizer","developer":"E-commerce Tech Pro","release_date":"2023-11-13T16:36:42","last_update_date":"2023-11-13T16:36:42","supplier_name":"E-commerce Tech Pro","supplier_email":"ecommercetech@gmail.com","contract_duration":3}]}
    
    spyOn(toolService, 'getCategories').and.returnValue(of(categoriesData));
    spyOn(toolService,'getCategoryPlugins').and.callFake((categoryId: number) => {
      return of(pluginsData);
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 categories', () => {
    expect(component.categories.length).toBe(5);
  });

  it('should have 4 plugins in category 1', () => {
    expect(component.categoryPlugins[1].length).toBe(4);
  });
});
