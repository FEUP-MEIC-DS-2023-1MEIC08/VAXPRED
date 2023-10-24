import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideFilterComponent } from './side-filter.component';
import { WorkspaceService } from '../workspace.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Workspace } from '../workspace';


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
  let workspaceService: WorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideFilterComponent],
      providers: [
        WorkspaceService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(SideFilterComponent);
    component = fixture.componentInstance;
    workspaceService = TestBed.inject(WorkspaceService);
    
    spyOn(workspaceService, 'getWorkspaces').and.returnValue([new Workspace(1, 'Vaccine X', 'Description 1', 'Quality'),new Workspace(2, 'Protein', 'Description 2','Curation'),new Workspace(3, 'Virus', 'Description 3','Generation')]);
    spyOn(workspaceService, 'getToolTypes').and.returnValue(['Generation', 'Curation', 'Quality']);
   
    component.items = workspaceService.getWorkspaces().slice();
    component.originalItems = workspaceService.getWorkspaces();
    component.toolTypes = workspaceService.getToolTypes().slice();
   
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
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

  it('should sort items in ascending order', () => {
    component.sortingOption = 'aToZ';
    component.toggleSorting();

    let expected_List=[new Workspace(2, 'Protein', 'Description 2','Curation'),new Workspace(1, 'Vaccine X', 'Description 1', 'Quality'),new Workspace(3, 'Virus', 'Description 3','Generation')];
    
    expect(component.sortingOption).toEqual('aToZ');
    expect(component.items).toEqual(expected_List);
  });

  it('should sort items in descending order', () => {
    component.sortingOption = 'zToA';
    component.toggleSorting();

    let expected_List=[new Workspace(3, 'Virus', 'Description 3','Generation'),new Workspace(1, 'Vaccine X', 'Description 1', 'Quality'),new Workspace(2, 'Protein', 'Description 2','Curation')];
    
    expect(component.sortingOption).toEqual('zToA');
    expect(component.items).toEqual(expected_List);
  });

  it('should reset the list when sorting option is "original"', () => {
    component.sortingOption = 'original';
    component.items=[new Workspace(3, 'Virus', 'Description 3','Generation'),new Workspace(1, 'Vaccine X', 'Description 1', 'Quality'),new Workspace(2, 'Protein', 'Description 2','Curation')];
    
    component.toggleSorting();

    expect(component.sortingOption).toEqual('original');
    expect(component.items).toEqual(component.originalItems);
  });

  it('should filter the list based on 1 selected tool types', () => {
    component.selectedToolTypes = { 'Quality': true, 'Generation': false, 'Curation': false };
    
    component.filterList();

    let expected_List=[new Workspace(1, 'Vaccine X', 'Description 1', 'Quality')];
    expect(component.items).toEqual(expected_List);
  });

  it('should filter the list based on 2 selected tool types', () => {
    component.selectedToolTypes = { 'Quality': true, 'Generation': true, 'Curation': false };
    console.log("Initial Component list")
    console.log(component.items)
    component.filterList();
    console.log("after filter")
    console.log(component.items)
    let expected_List=[new Workspace(1, 'Vaccine X', 'Description 1', 'Quality'),new Workspace(3, 'Virus', 'Description 3','Generation')];
    expect(component.items).toEqual(expected_List);

  });

  it('should filter the list based on 2 selected tool types and order the list in descending order', () => {
    component.selectedToolTypes = { 'Quality': true, 'Generation': true, 'Curation': false };
    component.filterList();
    component.sortingOption = 'zToA';
    component.toggleSorting();

    
    let expected_List=[new Workspace(3, 'Virus', 'Description 3','Generation'),new Workspace(1, 'Vaccine X', 'Description 1', 'Quality')];
    expect(component.items).toEqual(expected_List);
  });

  it('should filter the list based on 2 selected tool types and order the list in descending order and then reset', () => {
    component.selectedToolTypes = { 'Quality': true, 'Generation': true, 'Curation': false };
    component.filterList();
    component.sortingOption = 'zToA';
    component.toggleSorting();
    component.resetListToInitialFormat();
    
    let expected_List=[new Workspace(1, 'Vaccine X', 'Description 1', 'Quality'),new Workspace(3, 'Virus', 'Description 3','Generation')];
    expect(component.items).toEqual(expected_List);
  });

});
