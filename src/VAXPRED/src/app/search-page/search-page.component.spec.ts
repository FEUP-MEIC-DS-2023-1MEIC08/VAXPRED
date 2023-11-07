import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { SearchPageComponent } from './search-page.component';
import { SideFilterComponent } from './side-filter/side-filter.component';
import { FormsModule } from '@angular/forms';
import { PluginCardComponent } from './plugin-card/plugin-card.component';

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (param: string) => 'mockValue',
    },
  },
};
describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPageComponent,SideFilterComponent, PluginCardComponent],
      imports:[FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
