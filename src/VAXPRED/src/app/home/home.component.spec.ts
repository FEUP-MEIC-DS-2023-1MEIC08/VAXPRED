import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HomeComponent } from './home.component';
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
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,SideFilterComponent, PluginCardComponent],
      imports:[FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
