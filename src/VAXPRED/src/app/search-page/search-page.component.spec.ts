import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { SearchPageComponent } from './search-page.component';
import { SideFilterComponent } from './side-filter/side-filter.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
                fn({ categories: 'mockCategory', tags: 'mockTag' }),
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

  it('should set selectedTag from query params', () => {
    expect(component.selectedTag).toBe('mockTag');
  });



});