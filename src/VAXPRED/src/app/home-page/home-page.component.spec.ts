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
    let pluginsData={'plugins':[
      {
        "id": 1,
        "name": "ProductivityMaster",
        "version": "3.0",
        "description": "Boost your productivity with this amazing plugin",
        "developer": "TechSolutions Inc.",
        "release_date": "2023-11-13T16:36:42",
        "last_update_date": "2023-11-13T16:36:42",
        "supplier_name": "TechSolutions Inc.",
        "supplier_email": "techsolutions@gmail.com",
        "contract_duration": 2,
        "price":0,
        "type":"Data Quality",
        "dependencies":["Lisinopril"],
        "categories":["Other"],
        "tags":["Quick"],
        "faqs":[{"question":"What is this Plugin?","answer":"This Plugin is a powerful tool that helps with..."},{"question":"How do I install this Plugin?","answer":"To install this Plugin, you need to follow these steps..."}],
        "images":["\\images\\create.png"]
      },
      {
        "id":2,
        "name":"DataAnalyzer Pro",
        "version":"2.5",
        "description":"Analyze data like a pro with this powerful tool",
        "developer":"DataTech Labs","release_date":"2023-11-30T16:08:33",
        "last_update_date":"2023-11-30T16:08:33",
        "supplier_name":"DataTech Labs",
        "supplier_email":"datatechlabs@gmail.com",
        "contract_duration":null,
        "price":10,
        "type":"Data Quality",
        "dependencies":["Titanium Dioxide, Octinoxate/EthylhexylMethoxycinnamate"],
        "categories":["Virus"],
        "tags":["Misc"],
        "faqs":[{"question":"Can this Plugin be customized?","answer":"Yes, It comes with customization options that allow you to..."}],
        "images":["\\images\\info.png"]
      },
      {
        "id":3,
        "name":"SecurityGuard",
        "version":"1.2",
        "description":"Enhance your system security with SecurityGuard",
        "developer":"SecureSoft",
        "release_date":"2023-11-30T16:08:33",
        "last_update_date":"2023-11-30T16:08:33",
        "supplier_name":"SecureSoft",
        "supplier_email":"securesoft@gmail.com",
        "contract_duration":3,
        "price":0,
        "type":"Data Quality",
        "dependencies":["Titanium Dioxide and Zinc Oxide"],
        "categories":["Bacteria"],
        "tags":["High"],
        "faqs":[{"question":"Is there a tutorial for using this Plugin?","answer":"Certainly! We have a detailed tutorial on our website that guides you through..."}],
        "images":["\\images\\details.png"]
        },
      {
        "id":17,
        "name":"E-commerceOptimizer",
        "version":"3.1",
        "description":"Optimize your e-commerce business with E-commerceOptimizer",
        "developer":"E-commerce Tech Pro",
        "release_date":"2023-11-30T16:08:33",
        "last_update_date":"2023-11-30T16:08:33",
        "supplier_name":"E-commerce Tech Pro",
        "supplier_email":"ecommercetech@gmail.com",
        "contract_duration":3,
        "price":0,
        "type":"Synthetic Data Generation",
        "dependencies":[],
        "categories":["Other"],
        "tags":["Genes"],
        "faqs":[],
        "images":["\\images\\help.png"]
      }
    ]}
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
