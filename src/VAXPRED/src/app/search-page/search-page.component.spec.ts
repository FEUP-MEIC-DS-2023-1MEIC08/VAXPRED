import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SearchPageComponent } from './search-page.component';
import { SideFilterComponent } from './side-filter/side-filter.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PluginCardComponent } from './plugin-card/plugin-card.component';
import { MatDialogModule } from '@angular/material/dialog';
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: () => 'mockValue',
    },
  },
};
describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPageComponent, SideFilterComponent],
      imports: [FormsModule,HttpClientTestingModule],
      providers: [
        {
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
        },
      ],
    });

    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedCategory from query params', () => {
    expect(component.selectedCategory).toBe('mockCategory');
  });



});
