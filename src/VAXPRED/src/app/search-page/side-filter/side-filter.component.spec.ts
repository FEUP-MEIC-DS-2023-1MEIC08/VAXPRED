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
      providers: [ToolService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideFilterComponent);
    component = fixture.componentInstance;
    toolService = TestBed.inject(ToolService);
    httpMock=TestBed.inject(HttpTestingController)
    let pluginData={'plugins':[{
      "id": 1,
      "name": "ProductivityMaster",
      "version": "3.0",
      "description": "Boost your productivity with this amazing plugin",
      "developer": "TechSolutions Inc.",
      "release_date": "2023-11-13T16:36:42",
      "last_update_date": "2023-11-13T16:36:42",
      "supplier_name": "TechSolutions Inc.",
      "supplier_email": "techsolutions@gmail.com",
      "contract_duration": 2
    },
    {
      "id": 2,
      "name": "DataAnalyzer Pro",
      "version": "2.5",
      "description": "Analyze data like a pro with this powerful tool",
      "developer": "DataTech Labs",
      "release_date": "2023-11-13T16:36:42",
      "last_update_date": "2023-11-13T16:36:42",
      "supplier_name": "DataTech Labs",
      "supplier_email": "datatechlabs@gmail.com",
      "contract_duration": 2
    },
    {
      "id": 3,
      "name": "SecurityGuard",
      "version": "1.2",
      "description": "Enhance your system security with SecurityGuard",
      "developer": "SecureSoft",
      "release_date": "2023-11-13T16:36:42",
      "last_update_date": "2023-11-13T16:36:42",
      "supplier_name": "SecureSoft",
      "supplier_email": "securesoft@gmail.com",
      "contract_duration": 3
    }]}

    let categoryData = {"categories":[{"id":1,"name":"Other"},{"id":2,"name":"Virus"},{"id":3,"name":"Bacteria"},{"id":4,"name":"DNA"},{"id":5,"name":"Machine Learning"}]};
    // Mock the necessary service methods
    spyOn(toolService, 'getPlugins').and.returnValue(of(pluginData));
    spyOn(toolService, 'getCategories').and.returnValue(of(categoryData));
    spyOn(toolService, 'getTags').and.returnValue(['Tag 1', 'Tag 2', 'Tag 3']);


    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    fixture.detectChanges();
    //console.log(component.items)
    // You can add expectations based on the component's initial state or behavior after initialization
    expect(component.items.length).toBe(3);
    expect(component.toolTypes.length).toBe(5);
    // Add more expectations as needed
  }); 

  // Add more tests for other component methods and behavior

/*   it('should filter the list based on selected category', () => {
    // Set up initial conditions
    //component = fixture.componentInstance; 
    spyOn(component, 'filterList');
    component.selectedCategory ='Other';
   
    // Spy on the filterList method to track its behavior
    // Trigger change detection
    fixture.detectChanges()
    // Expect the filterList method to have been called
    expect(component.filterList).toHaveBeenCalled();
    console.log("ITEMS DA CENA")
    console.log(component.items)
    expect(component.items.length).toBe(0)
  }); */

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
        new Date('2023-11-13T16:36:42'), // release_date
        new Date('2023-11-13T16:36:42'), // last_update_date
        'Data Quality', // type
        [], // tags
        2 // contract_duration
      ),
      new Plugin(
      1, // id
      'ProductivityMaster', // name
      'Boost your productivity with this amazing plugin', // description
      'assets/img/ydata.png', // image/logo
      '3.0', // version
      'TechSolutions Inc.', // developer
      new Date('2023-11-13T16:36:42'), // release_date
      new Date('2023-11-13T16:36:42'), // last_update_date
      'Data Quality', // type
      [], // tags
      2 // contract_duration
    ),
    new Plugin(
      3, // id
      'SecurityGuard', // name
      'Enhance your system security with SecurityGuard', // description
      'assets/img/ydata.png', // image/logo
      '1.2', // version
      'SecureSoft', // developer
      new Date('2023-11-13T16:36:42'), // release_date
      new Date('2023-11-13T16:36:42'), // last_update_date
      'Data Quality', // type
      [], // tags
      3 // contract_duration
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
        new Date('2023-11-13T16:36:42'), // release_date
        new Date('2023-11-13T16:36:42'), // last_update_date
        'Data Quality', // type
        [], // tags
        3 // contract_duration
      ),
      new Plugin(
        1, // id
        'ProductivityMaster', // name
        'Boost your productivity with this amazing plugin', // description
        'assets/img/ydata.png', // image/logo
        '3.0', // version
        'TechSolutions Inc.', // developer
        new Date('2023-11-13T16:36:42'), // release_date
        new Date('2023-11-13T16:36:42'), // last_update_date
        'Data Quality', // type
        [], // tags
        2 // contract_duration
      ),
      new Plugin(
        2, // id
        'DataAnalyzer Pro', // name
        'Analyze data like a pro with this powerful tool', // description
        'assets/img/ydata.png', // image/logo
        '2.5', // version
        'DataTech Labs', // developer
        new Date('2023-11-13T16:36:42'), // release_date
        new Date('2023-11-13T16:36:42'), // last_update_date
        'Data Quality', // type
        [], // tags
        2 // contract_duration
      ),
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
/*
  it('should filter the list based on 1 selected tool types', () => {
    fixture.detectChanges();
    component.selectedToolTypes = { 'Data Quality': false, 'Synthetic Data Generation': false, 'Data Curation': true };
    
    component.filterList();

    const expected_List=[		
		new Plugin(3, 'Sama', 'assets/img/ydata.png', 'Data Curation', 'Your ML model\'s success \
			requires more than data. It requires a trusted data curation, annotation & validation partner \
			capable of managing risk while providing proactive insights and predictability.', ['Tag 1', 'Tag 2']),
	];
    expect(component.items).toEqual(expected_List);
  });
  
  it('should filter the list based on 2 selected tool types', () => {
    component.selectedToolTypes = { 'Data Quality': false, 'Synthetic Data Generation': true, 'Data Curation': true };
    console.log("Initial Component list")
    console.log(component.items)
    component.filterList();
    console.log("after filter")
    console.log(component.items)
    const expected_List=
	[
		new Plugin(1, 'YData', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Generate synthetic data \
			that mimics the statistical properties and behaviour of the real data. Protect your sensitive data, \
			augment your datasets and improve efficiency of your models by replacing real data or enriching it with synthetic data',['Tag 1']),
		new Plugin(2, 'MOSTLY.AI', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Synthetic data looks and \
			feels like real data. With MOSTLY AI, you can make your synthetic data bigger, smaller, rebalanced, \
			or augmented to fill in missing data points. Learn more about ',['Tag 1', 'Tag 2', 'Tag 3']),
		new Plugin(3, 'Sama', 'assets/img/ydata.png', 'Data Curation', 'Your ML model\'s success \
			requires more than data. It requires a trusted data curation, annotation & validation partner \
			capable of managing risk while providing proactive insights and predictability.', ['Tag 1', 'Tag 2']),
	];
    expect(component.items).toEqual(expected_List);

  });

  it('should filter the list based on 2 selected tool types and order the list in descending order', () => {
    component.selectedToolTypes = { 'Data Quality': false, 'Synthetic Data Generation': true, 'Data Curation': true };
    component.filterList();
    component.sortingOption = 'zToA';
    component.toggleSorting();

    
    const expected_List=[
		new Plugin(1, 'YData', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Generate synthetic data \
			that mimics the statistical properties and behaviour of the real data. Protect your sensitive data, \
			augment your datasets and improve efficiency of your models by replacing real data or enriching it with synthetic data',['Tag 1']),
		new Plugin(3, 'Sama', 'assets/img/ydata.png', 'Data Curation', 'Your ML model\'s success \
			requires more than data. It requires a trusted data curation, annotation & validation partner \
			capable of managing risk while providing proactive insights and predictability.', ['Tag 1', 'Tag 2']),
		new Plugin(2, 'MOSTLY.AI', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Synthetic data looks and \
			feels like real data. With MOSTLY AI, you can make your synthetic data bigger, smaller, rebalanced, \
			or augmented to fill in missing data points. Learn more about ',['Tag 1', 'Tag 2', 'Tag 3']),
	];
    expect(component.items).toEqual(expected_List);
  });

  it('should filter the list based on 2 selected tool types and order the list in descending order and then reset', () => {
    component.selectedToolTypes = { 'Data Quality': false, 'Synthetic Data Generation': true, 'Data Curation': true };
    component.filterList();
    component.sortingOption = 'zToA';
    component.toggleSorting();
    component.resetListToInitialFormat();
    
    const expected_List=[		
		new Plugin(1, 'YData', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Generate synthetic data \
			that mimics the statistical properties and behaviour of the real data. Protect your sensitive data, \
			augment your datasets and improve efficiency of your models by replacing real data or enriching it with synthetic data',['Tag 1']),
		new Plugin(2, 'MOSTLY.AI', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Synthetic data looks and \
			feels like real data. With MOSTLY AI, you can make your synthetic data bigger, smaller, rebalanced, \
			or augmented to fill in missing data points. Learn more about ',['Tag 1', 'Tag 2', 'Tag 3']),
		new Plugin(3, 'Sama', 'assets/img/ydata.png', 'Data Curation', 'Your ML model\'s success \
			requires more than data. It requires a trusted data curation, annotation & validation partner \
			capable of managing risk while providing proactive insights and predictability.', ['Tag 1', 'Tag 2']),
	];
    expect(component.items).toEqual(expected_List);
  });


 */
});
