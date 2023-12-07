import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideFilterComponent } from './side-filter.component';
import { ToolService } from '../../plugin.service';
import { ActivatedRoute } from '@angular/router';
import { Plugin } from '../plugin-card/tool';
import { PluginCardComponent } from '../plugin-card/plugin-card.component';


const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (param: string) => 'mockValue',
      },
    },
  };

describe('SideFilterComponent', () => {
  let component: SideFilterComponent;
  let fixture: ComponentFixture<SideFilterComponent>;
  let toolService: ToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideFilterComponent],
      providers: [
        ToolService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(SideFilterComponent);
    component = fixture.componentInstance;
    toolService = TestBed.inject(ToolService);
    
    spyOn(toolService, 'getTools').and.returnValue([
		new Plugin(1, 'YData', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Generate synthetic data \
			that mimics the statistical properties and behaviour of the real data. Protect your sensitive data, \
			augment your datasets and improve efficiency of your models by replacing real data or enriching it with synthetic data',['Tag 1']),
		new Plugin(2, 'MOSTLY.AI', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Synthetic data looks and \
			feels like real data. With MOSTLY AI, you can make your synthetic data bigger, smaller, rebalanced, \
			or augmented to fill in missing data points. Learn more about ',['Tag 1', 'Tag 2', 'Tag 3']),
		new Plugin(3, 'Sama', 'assets/img/ydata.png', 'Data Curation', 'Your ML model\'s success \
			requires more than data. It requires a trusted data curation, annotation & validation partner \
			capable of managing risk while providing proactive insights and predictability.',['Tag 1', 'Tag 2']),
	]);
    spyOn(toolService, 'getToolCategoriess').and.returnValue(['Data Quality', 'Data Curation', 'Synthetic Data Generation']);
   
    component.items = toolService.getTools().slice();
    component.originalItems = toolService.getTools();
    component.toolCategories = toolService.getToolCategories().slice();
   
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should sort items in ascending order', () => {
    component.sortingOption = 'aToZ';
    component.toggleSorting();

    const expected_List=[
		new Plugin(2, 'MOSTLY.AI', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Synthetic data looks and \
			feels like real data. With MOSTLY AI, you can make your synthetic data bigger, smaller, rebalanced, \
			or augmented to fill in missing data points. Learn more about ',['Tag 1', 'Tag 2', 'Tag 3']),
		new Plugin(3, 'Sama', 'assets/img/ydata.png', 'Data Curation', 'Your ML model\'s success \
			requires more than data. It requires a trusted data curation, annotation & validation partner \
			capable of managing risk while providing proactive insights and predictability.', ['Tag 1', 'Tag 2']),
		new Plugin(1, 'YData', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Generate synthetic data \
			that mimics the statistical properties and behaviour of the real data. Protect your sensitive data, \
			augment your datasets and improve efficiency of your models by replacing real data or enriching it with synthetic data',['Tag 1']),
	];
    
    expect(component.sortingOption).toEqual('aToZ');
    expect(component.items).toEqual(expected_List);
  });

  it('should sort items in descending order', () => {
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
   
    expect(component.sortingOption).toEqual('zToA');
    expect(component.items).toEqual(expected_List);
  });

  it('should reset the list to the initial format', () => {
    component.sortingOption = 'aToZ';
    component.isRadioSelected = true;
    component.toggleSorting();
    component.resetListToInitialFormat();

    expect(component.sortingOption).toEqual('original');
    expect(component.isRadioSelected).toBe(false);
    expect(component.items).toEqual(component.originalItems);

  });
  it('should filter the list based on 1 selected tool categoriess', () => {
    component.selectedToolCategories = { 'Data Quality': false, 'Synthetic Data Generation': false, 'Data Curation': true };
    
    component.filterList();

    const expected_List=[		
		new Plugin(3, 'Sama', 'assets/img/ydata.png', 'Data Curation', 'Your ML model\'s success \
			requires more than data. It requires a trusted data curation, annotation & validation partner \
			capable of managing risk while providing proactive insights and predictability.', ['Tag 1', 'Tag 2']),
	];
    expect(component.items).toEqual(expected_List);
  });

  it('should filter the list based on 2 selected tool categories', () => {
    component.selectedToolCategories = { 'Data Quality': false, 'Synthetic Data Generation': true, 'Data Curation': true };
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

  it('should filter the list based on 2 selected tool categories and order the list in descending order', () => {
    component.selectedToolCategories = { 'Data Quality': false, 'Synthetic Data Generation': true, 'Data Curation': true };
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

  it('should filter the list based on 2 selected tool categories and order the list in descending order and then reset', () => {
    component.selectedToolCategories = { 'Data Quality': false, 'Synthetic Data Generation': true, 'Data Curation': true };
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

  it('should filter the list based on 1 selected Tag', () => {
    component.selectedTags = { 'Tag 1': false, 'Tag 2': false, 'Tag 3': true };
    component.filterList();
    
    const expected_List=[		
		new Plugin(2, 'MOSTLY.AI', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Synthetic data looks and \
			feels like real data. With MOSTLY AI, you can make your synthetic data bigger, smaller, rebalanced, \
			or augmented to fill in missing data points. Learn more about ',['Tag 1', 'Tag 2', 'Tag 3']),
	];
    expect(component.items).toEqual(expected_List);
  });

  it('should filter the list based on 2 selected Tags', () => {
    component.selectedTags = { 'Tag 1': false, 'Tag 2': true, 'Tag 3': true };
    component.filterList();
    
    const expected_List=[		
		new Plugin(2, 'MOSTLY.AI', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Synthetic data looks and \
			feels like real data. With MOSTLY AI, you can make your synthetic data bigger, smaller, rebalanced, \
			or augmented to fill in missing data points. Learn more about ',['Tag 1', 'Tag 2', 'Tag 3']),
		new Plugin(3, 'Sama', 'assets/img/ydata.png', 'Data Curation', 'Your ML model\'s success \
			requires more than data. It requires a trusted data curation, annotation & validation partner \
			capable of managing risk while providing proactive insights and predictability.', ['Tag 1', 'Tag 2']),
	];
    expect(component.items).toEqual(expected_List);
  });

  it('should filter the list based on 1 selected Tool category and 1 selected Tag', () => {
    component.selectedToolCategories = { 'Data Quality': false, 'Synthetic Data Generation': true, 'Data Curation': false };
    component.selectedTags = { 'Tag 1': false, 'Tag 2': true, 'Tag 3': false };

    component.filterList();

    const expected_List=[
      		new Plugin(2, 'MOSTLY.AI', 'assets/img/ydata.png', 'Synthetic Data Generation', 'Synthetic data looks and \
			feels like real data. With MOSTLY AI, you can make your synthetic data bigger, smaller, rebalanced, \
			or augmented to fill in missing data points. Learn more about ',['Tag 1', 'Tag 2', 'Tag 3']),
        	];
    expect(component.items).toEqual(expected_List);
  });

  

});
