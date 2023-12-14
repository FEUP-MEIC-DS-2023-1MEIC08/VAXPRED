import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideFilterComponent } from './side-filter.component';
import { ToolService } from 'src/app/plugin.service';
import { HttpClientTestingModule,HttpTestingController  } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PluginCardComponent } from '../plugin-card/plugin-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Plugin } from 'src/app/plugin';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('SideFilterComponent', () => {
  let component: SideFilterComponent;
  let fixture: ComponentFixture<SideFilterComponent>;
  let toolService: ToolService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,FormsModule, MatDialogModule],
      declarations: [SideFilterComponent, PluginCardComponent],
      schemas: [NO_ERRORS_SCHEMA], // Add NO_ERRORS_SCHEMA here
      providers: [ToolService,{
		provide: ActivatedRoute,
		useValue: {
		  snapshot: {
			paramMap: convertToParamMap({ categories: 'mockCategory' }),
		  },
		  queryParams: {
			subscribe: (fn: (value: any) => void) =>
			  fn({ categories: 'mockCategory' }),
		  },
		},
	  }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideFilterComponent);
    component = fixture.componentInstance;
    toolService = TestBed.inject(ToolService);
    httpMock=TestBed.inject(HttpTestingController)
    let pluginData={'plugins':[
		{
			"id":1,
			"name":"ProductivityMaster",
			"version":"3.0",
			"description":"Boost your productivity with this amazing plugin",
			"developer":"TechSolutions Inc.",
			"release_date":"2023-12-11T22:46:55",
			"last_update_date":"2023-12-11T22:46:55",
			"supplier_name":"TechSolutions Inc.",
			"supplier_email":"techsolutions@gmail.com",
			"contract_duration":2,
			"price":0,
			"category":"Data Quality",
			"changelog":"This is the changelog.",
			"dependencies":[["Lisinopril","Oyope","0.37"]],
			"tags":["Quick"],
			"faqs":[],
			"images":["\\images\\create.png"]
		},
		{
			"id":2,
			"name":"DataAnalyzer Pro",
			"version":"2.5",
			"description":"Analyze data like a pro with this powerful tool","developer":"DataTech Labs",
			"release_date":"2023-12-11T22:46:55",
			"last_update_date":"2023-12-11T22:46:55",
			"supplier_name":"DataTech Labs",
			"supplier_email":"datatechlabs@gmail.com",
			"contract_duration":0,
			"price":10,
			"category":"Data Quality",
			"changelog":"This is the changelog.",
			"dependencies":[["Titanium Dioxide ","AquaTech","2.1.0"]],
			"tags":["Misc"],
			"faqs":[],
			"images":["\\images\\info.png"]
		},
		{
			"id":3,
			"name":"SecurityGuard",
			"version":"1.2",
			"description":"Enhance your system security with SecurityGuard",
			"developer":"SecureSoft",
			"release_date":"2023-12-11T22:46:55",
			"last_update_date":"2023-12-11T22:46:55",
			"supplier_name":"SecureSoft",
			"supplier_email":"securesoft@gmail.com",
			"contract_duration":3,
			"price":0,
			"category":"Data Quality",
			"changelog":"This is the changelog.",
			"dependencies":[["Zinc Dioxide","NanoBlend","3.0.5"]],
			"tags":["High"],
			"faqs":[],
			"images":["\\images\\details.png"]
    	},
		{
			"id":19,
			"name":"InventoryTracker",
			"version":"1.8",
			"description":"Track your inventory efficiently with InventoryTracker",
			"developer":"InventoryTech Ltd.",
			"release_date":"2023-12-11T22:46:55",
			"last_update_date":"2023-12-11T22:46:55",
			"supplier_name":"InventoryTech Ltd.",
			"supplier_email":"inventorytech@gmail.com",
			"contract_duration":2,
			"price":0,
			"category":"Synthetic Data Generation",
			"changelog":"This is the changelog.",
			"dependencies":[],
			"tags":["Quick"],
			"faqs":[],
			"images":["\\images\\create.png"],
		}
	]}





    //let categoryData = {"categories":[{"id":1,"name":"Other"},{"id":2,"name":"Virus"},{"id":3,"name":"Bacteria"},{"id":4,"name":"DNA"},{"id":5,"name":"Machine Learning"}]}
    let tagData={"tags":[{"id":1,"name":"Quick"},{"id":2,"name":"Misc"},{"id":3,"name":"High"},{"id":4,"name":"Medium"},{"id":5,"name":"Low"},{"id":6,"name":"Random"},{"id":7,"name":"Enzyme"},{"id":8,"name":"Genes"},{"id":9,"name":"Organism"},{"id":10,"name":"Mitochondria"}]}
	
	// Mock the necessary service methods
    spyOn(toolService, 'getPlugins').and.returnValue(of(pluginData));
    //spyOn(toolService, 'getCategories').and.returnValue(of(categoryData));
    spyOn(toolService, 'getTags').and.returnValue(of(tagData));
	spyOn(toolService,'getCategoryPlugins').and.callFake((category: string) => {
		let pluginToBeReturned={'plugins':[
			{
				"id":1,
				"name":"ProductivityMaster",
				"version":"3.0",
				"description":"Boost your productivity with this amazing plugin",
				"developer":"TechSolutions Inc.",
				"release_date":"2023-12-11T22:46:55",
				"last_update_date":"2023-12-11T22:46:55",
				"supplier_name":"TechSolutions Inc.",
				"supplier_email":"techsolutions@gmail.com",
				"contract_duration":2,
				"price":0,
				"category":"Data Quality",
				"changelog":"This is the changelog.",
				"dependencies":[["Lisinopril","Oyope","0.37"]],
				"tags":["Quick"],
				"faqs":[],
				"images":["\\images\\create.png"]
			},
			{
				"id":2,
				"name":"DataAnalyzer Pro",
				"version":"2.5",
				"description":"Analyze data like a pro with this powerful tool","developer":"DataTech Labs",
				"release_date":"2023-12-11T22:46:55",
				"last_update_date":"2023-12-11T22:46:55",
				"supplier_name":"DataTech Labs",
				"supplier_email":"datatechlabs@gmail.com",
				"contract_duration":0,
				"price":10,
				"category":"Data Quality",
				"changelog":"This is the changelog.",
				"dependencies":[["Titanium Dioxide ","AquaTech","2.1.0"]],
				"tags":["Misc"],
				"faqs":[],
				"images":["\\images\\info.png"]
			},
			{
				"id":3,
				"name":"SecurityGuard",
				"version":"1.2",
				"description":"Enhance your system security with SecurityGuard",
				"developer":"SecureSoft",
				"release_date":"2023-12-11T22:46:55",
				"last_update_date":"2023-12-11T22:46:55",
				"supplier_name":"SecureSoft",
				"supplier_email":"securesoft@gmail.com",
				"contract_duration":3,
				"price":0,
				"category":"Data Quality",
				"changelog":"This is the changelog.",
				"dependencies":[["Zinc Dioxide","NanoBlend","3.0.5"]],
				"tags":["High"],
				"faqs":[],
				"images":["\\images\\details.png"]
			}
		]}
		return of(pluginToBeReturned);
	  });

	  spyOn(toolService,'getPluginsByTag').and.callFake((tag: string) => {
		let pluginToBeReturned={'plugins':[
			
			{
				"id":1,
				"name":"ProductivityMaster",
				"version":"3.0",
				"description":"Boost your productivity with this amazing plugin",
				"developer":"TechSolutions Inc.",
				"release_date":"2023-12-11T22:46:55",
				"last_update_date":"2023-12-11T22:46:55",
				"supplier_name":"TechSolutions Inc.",
				"supplier_email":"techsolutions@gmail.com",
				"contract_duration":2,
				"price":0,
				"category":"Data Quality",
				"changelog":"This is the changelog.",
				"dependencies":[["Lisinopril","Oyope","0.37"]],
				"tags":["Quick"],
				"faqs":[],
				"images":["\\images\\create.png"]
			},
			{
				"id":19,
				"name":"InventoryTracker",
				"version":"1.8",
				"description":"Track your inventory efficiently with InventoryTracker",
				"developer":"InventoryTech Ltd.",
				"release_date":"2023-12-11T22:46:55",
				"last_update_date":"2023-12-11T22:46:55",
				"supplier_name":"InventoryTech Ltd.",
				"supplier_email":"inventorytech@gmail.com",
				"contract_duration":2,
				"price":0,
				"category":"Synthetic Data Generation",
				"changelog":"This is the changelog.",
				"dependencies":[],
				"tags":["Quick"],
				"faqs":[],
				"images":["\\images\\create.png"],
			}
			
		]}
		return of(pluginToBeReturned);
	  });
				

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    fixture.detectChanges();
    // Initial expected values 
    expect(component.items.length).toBe(4);
    expect(component.toolCategories.length).toBe(3);
	expect(component.tags.length).toBe(10);
  
  }); 

  

  it('should sort items in ascending order', () => {
    fixture.detectChanges();
    component.sortingOption = 'aToZ';
    component.toggleSorting();
  
    const expected_List=[
      new Plugin(
        2, // id
        'DataAnalyzer Pro', // name
        'Analyze data like a pro with this powerful tool', // description
        'assets/img/ydata.png', // image/logo
        '2.5', // version
        'DataTech Labs', // developer
        new Date('2023-12-11T22:46:55'), // release_date
        new Date('2023-12-11T22:46:55'), // last_update_date
        'Data Quality', // category
		"This is the changelog.", // changelog
		["Misc"],//tags
        0, // contract_duration
		[], //faq
		10 //price
      ),
	  new Plugin(
		19, // id
		'InventoryTracker', // name
		'Track your inventory efficiently with InventoryTracker', // description
		'assets/img/ydata.png', // image/logo
		'1.8', // version
		'InventoryTech Ltd.', // developer
		new Date('2023-12-11T22:46:55'), // release_date
		new Date('2023-12-11T22:46:55'), // last_update_date
		'Synthetic Data Generation', // category
		"This is the changelog.", // changelog
		["Quick"],//tags
        2, // contract_duration
		[], //faq
		0 //price
      ),
      new Plugin(
      1, // id
      'ProductivityMaster', // name
      'Boost your productivity with this amazing plugin', // description
      'assets/img/ydata.png', // image/logo
      '3.0', // version
      'TechSolutions Inc.', // developer
      new Date('2023-12-11T22:46:55'), // release_date
      new Date('2023-12-11T22:46:55'), // last_update_date
      'Data Quality', // category
		"This is the changelog.", // changelog
		["Quick"],//tags
        2, // contract_duration
		[], //faq
		0 //price
    ),
    new Plugin(
      3, // id
      'SecurityGuard', // name
      'Enhance your system security with SecurityGuard', // description
      'assets/img/ydata.png', // image/logo
      '1.2', // version
      'SecureSoft', // developer
      new Date('2023-12-11T22:46:55'), // release_date
      new Date('2023-12-11T22:46:55'), // last_update_date
      'Data Quality', // category
		"This is the changelog.", // changelog
		["High"],//tags
        3, // contract_duration
		[], //faq
		0 //price
    )
    ];
    expect(component.sortingOption).toEqual('aToZ');
    expect(component.items).toEqual(expected_List);
  });

  it('should sort items in descending order', () => {
    fixture.detectChanges();
    component.sortingOption = 'zToA';
    component.toggleSorting();

    const expected_List=[
		new Plugin(
			3, // id
			'SecurityGuard', // name
			'Enhance your system security with SecurityGuard', // description
			'assets/img/ydata.png', // image/logo
			'1.2', // version
			'SecureSoft', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			  "This is the changelog.", // changelog
			  ["High"],//tags
			  3, // contract_duration
			  [], //faq
			  0 //price
		  ),
		  new Plugin(
			1, // id
			'ProductivityMaster', // name
			'Boost your productivity with this amazing plugin', // description
			'assets/img/ydata.png', // image/logo
			'3.0', // version
			'TechSolutions Inc.', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			  "This is the changelog.", // changelog
			  ["Quick"],//tags
			  2, // contract_duration
			  [], //faq
			  0 //price
		  ),
		  new Plugin(
			19, // id
			'InventoryTracker', // name
			'Track your inventory efficiently with InventoryTracker', // description
			'assets/img/ydata.png', // image/logo
			'1.8', // version
			'InventoryTech Ltd.', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Synthetic Data Generation', // category
			"This is the changelog.", // changelog
			["Quick"],//tags
			2, // contract_duration
			[], //faq
			0 //price
		  ),
		  new Plugin(
			2, // id
			'DataAnalyzer Pro', // name
			'Analyze data like a pro with this powerful tool', // description
			'assets/img/ydata.png', // image/logo
			'2.5', // version
			'DataTech Labs', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			"This is the changelog.", // changelog
			["Misc"],//tags
			0, // contract_duration
			[], //faq
			10 //price
		  )
    ];
	
    expect(component.sortingOption).toEqual('zToA');
    expect(component.items).toEqual(expected_List);
  });
 
  it('should reset the list to the initial format', () => {
    fixture.detectChanges();
    component.sortingOption = 'aToZ';
    component.isRadioSelected = true;
    component.toggleSorting();
    component.resetListToInitialFormat();

    expect(component.sortingOption).toEqual('original');
    expect(component.isRadioSelected).toBe(false);
    expect(component.items).toEqual(component.originalItems);

  });

  it('should filter the list based on 1 selected tool category', () => {
    fixture.detectChanges();
    component.selectedCategory='data-quality';
    component.ngOnChanges();
    fixture.detectChanges();

    const expected_List=[	
		new Plugin(
			1, // id
			'ProductivityMaster', // name
			'Boost your productivity with this amazing plugin', // description
			'assets/img/ydata.png', // image/logo
			'3.0', // version
			'TechSolutions Inc.', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			  "This is the changelog.", // changelog
			  ["Quick"],//tags
			  2, // contract_duration
			  [], //faq
			  0 //price
		  ),
		  new Plugin(
			2, // id
			'DataAnalyzer Pro', // name
			'Analyze data like a pro with this powerful tool', // description
			'assets/img/ydata.png', // image/logo
			'2.5', // version
			'DataTech Labs', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			"This is the changelog.", // changelog
			["Misc"],//tags
			0, // contract_duration
			[], //faq
			10 //price
		  ),
		  new Plugin(
			3, // id
			'SecurityGuard', // name
			'Enhance your system security with SecurityGuard', // description
			'assets/img/ydata.png', // image/logo
			'1.2', // version
			'SecureSoft', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			  "This is the changelog.", // changelog
			  ["High"],//tags
			  3, // contract_duration
			  [], //faq
			  0 //price
		  )

		];
    expect(component.items).toEqual(expected_List);
  });
 
  
  it('should filter the list based on 1 selected tool category and order the list in descending order', () => {
	fixture.detectChanges();
    component.selectedCategory='data-quality';
    component.ngOnChanges();
    fixture.detectChanges();
    component.sortingOption = 'zToA';
    component.toggleSorting();

    
    const expected_List=[
		new Plugin(
			3, // id
			'SecurityGuard', // name
			'Enhance your system security with SecurityGuard', // description
			'assets/img/ydata.png', // image/logo
			'1.2', // version
			'SecureSoft', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			  "This is the changelog.", // changelog
			  ["High"],//tags
			  3, // contract_duration
			  [], //faq
			  0 //price
		  ),
		  new Plugin(
			1, // id
			'ProductivityMaster', // name
			'Boost your productivity with this amazing plugin', // description
			'assets/img/ydata.png', // image/logo
			'3.0', // version
			'TechSolutions Inc.', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			  "This is the changelog.", // changelog
			  ["Quick"],//tags
			  2, // contract_duration
			  [], //faq
			  0 //price
		  ),
		  new Plugin(
			2, // id
			'DataAnalyzer Pro', // name
			'Analyze data like a pro with this powerful tool', // description
			'assets/img/ydata.png', // image/logo
			'2.5', // version
			'DataTech Labs', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			"This is the changelog.", // changelog
			["Misc"],//tags
			0, // contract_duration
			[], //faq
			10 //price
		  )
		];
    expect(component.items).toEqual(expected_List);
  });

  it('should filter the list based on 1 selected tool types and order the list in descending order and then reset', () => {
	fixture.detectChanges();
    component.selectedCategory='data-quality';
    component.ngOnChanges();
    fixture.detectChanges();
    component.sortingOption = 'aToZ';
    component.toggleSorting();
    component.resetListToInitialFormat();
    
    const expected_List=[		
		new Plugin(
			1, // id
			'ProductivityMaster', // name
			'Boost your productivity with this amazing plugin', // description
			'assets/img/ydata.png', // image/logo
			'3.0', // version
			'TechSolutions Inc.', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			  "This is the changelog.", // changelog
			  ["Quick"],//tags
			  2, // contract_duration
			  [], //faq
			  0 //price
		  ),
		  new Plugin(
			2, // id
			'DataAnalyzer Pro', // name
			'Analyze data like a pro with this powerful tool', // description
			'assets/img/ydata.png', // image/logo
			'2.5', // version
			'DataTech Labs', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			"This is the changelog.", // changelog
			["Misc"],//tags
			0, // contract_duration
			[], //faq
			10 //price
		  ),
		  new Plugin(
			3, // id
			'SecurityGuard', // name
			'Enhance your system security with SecurityGuard', // description
			'assets/img/ydata.png', // image/logo
			'1.2', // version
			'SecureSoft', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			  "This is the changelog.", // changelog
			  ["High"],//tags
			  3, // contract_duration
			  [], //faq
			  0 //price
		  )
		];
    expect(component.items).toEqual(expected_List);
  });

  it('should filter the list based on 1 selected Tag', () => {
	fixture.detectChanges();
    component.selectedTag='1';
    component.ngOnChanges();
    fixture.detectChanges();

	const expected_List = [
		new Plugin(
			1, // id
			'ProductivityMaster', // name
			'Boost your productivity with this amazing plugin', // description
			'assets/img/ydata.png', // image/logo
			'3.0', // version
			'TechSolutions Inc.', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			  "This is the changelog.", // changelog
			  ["Quick"],//tags
			  2, // contract_duration
			  [], //faq
			  0 //price
		  ),
		  new Plugin(
			19, // id
			'InventoryTracker', // name
			'Track your inventory efficiently with InventoryTracker', // description
			'assets/img/ydata.png', // image/logo
			'1.8', // version
			'InventoryTech Ltd.', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Synthetic Data Generation', // category
			"This is the changelog.", // changelog
			["Quick"],//tags
			2, // contract_duration
			[], //faq
			0 //price
		  )
			
	];
	
	expect(component.items).toEqual(expected_List);
});


it('should filter the list based on 1 selected Tool type and 1 selected Tag', () => {
	fixture.detectChanges();
	component.selectedCategory='data-quality';
    component.selectedTag='1';
    component.ngOnChanges();
    fixture.detectChanges();

	const expected_List = [
		new Plugin(
			1, // id
			'ProductivityMaster', // name
			'Boost your productivity with this amazing plugin', // description
			'assets/img/ydata.png', // image/logo
			'3.0', // version
			'TechSolutions Inc.', // developer
			new Date('2023-12-11T22:46:55'), // release_date
			new Date('2023-12-11T22:46:55'), // last_update_date
			'Data Quality', // category
			  "This is the changelog.", // changelog
			  ["Quick"],//tags
			  2, // contract_duration
			  [], //faq
			  0 //price
		  )
			
	];
	expect(component.items).toEqual(expected_List);
});


}); 