import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from '../user-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        UserProfileComponent,
        MatDialogModule
      ],
      providers: [
        UserProfileService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {} 
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user data', () => {
    component.user = { id: 1, name: 'John Doe', email: 'johndoe@email.com', isAdmin: true };
    fixture.detectChanges();

    const nameElement = fixture.nativeElement.querySelector('h1[name="userName"]');
    const titleElement = fixture.nativeElement.querySelector('p[name="userEmail"]');

    expect(nameElement.textContent).toContain('John Doe');
    expect(titleElement.textContent).toContain('johndoe@email.com');
  });

  it('should render Plugin cards', () => {
    component.plugins = [
      { name: 'Plugin 1', description: 'Description 1' },
      { name: 'Plugin 2', description: 'Description 2' },
    ];
    fixture.detectChanges();

    const pluginCards = fixture.nativeElement.querySelectorAll('.plugin-container');
    expect(pluginCards.length).toBeGreaterThan(0);
  });

  it('should display a list of plugins', () => {
    component.plugins = [
      { name: 'Plugin 1', description: 'Description 1' },
      { name: 'Plugin 2', description: 'Description 2' },
    ];
    fixture.detectChanges();

    const pluginCards = fixture.nativeElement.querySelectorAll('.plugin-icon');

    expect(pluginCards.length).toEqual(2);

    const pluginNames = fixture.nativeElement.querySelectorAll('h5[name="pluginName"]');
    expect(pluginNames[0].textContent).toContain('Plugin 1');
    expect(pluginNames[1].textContent).toContain('Plugin 2');

    const pluginDescriptions = fixture.nativeElement.querySelectorAll('p[name="pluginDescription"]');
    expect(pluginDescriptions[0].textContent).toContain('Description 1');
    expect(pluginDescriptions[1].textContent).toContain('Description 2');
  });
});
