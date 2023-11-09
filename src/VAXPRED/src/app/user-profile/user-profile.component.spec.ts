import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from '../user-profile.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProfileService],
      imports: [HttpClientModule, UserProfileComponent],
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user data', () => {
    component.user = { name: 'John Doe', title: 'Senior Researcher', org: 'Faculdade de Engenharia da Universidade do Porto' };
    fixture.detectChanges();
    
    const nameElement = fixture.nativeElement.querySelector('h2[name="userName"]');
    const titleElement = fixture.nativeElement.querySelector('p[name="userTitle"]');
    const orgElement = fixture.nativeElement.querySelector('p[name="userOrg"]');
    
    expect(nameElement.textContent).toContain('John Doe');
    expect(titleElement.textContent).toContain('Senior Researcher');
    expect(orgElement.textContent).toContain('Faculdade de Engenharia da Universidade do Porto');
  });
  

  it('should display Edit Profile button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Edit Profile');
  });

  it('should trigger Edit profile action', () => {
    spyOn(component, 'editProfile').and.callThrough();
    fixture.detectChanges();

    const editButton = fixture.nativeElement.querySelector('button[name="editProfileButton"]');
    expect(editButton).toBeTruthy();

    editButton.click();
    expect(component.editProfile).toHaveBeenCalled();
  });
  
  it('should render Plugin cards', () => {
    component.plugins = [
      { name: 'Plugin 1', description: 'Description 1' },
      { name: 'Plugin 2', description: 'Description 2' },
    ];
    fixture.detectChanges();

    const pluginCards = fixture.nativeElement.querySelectorAll('.plugin-card');
    expect(pluginCards.length).toBeGreaterThan(0);
  });

  it('should display a list of plugins', () => {
    component.plugins = [
      { name: 'Plugin 1', description: 'Description 1' },
      { name: 'Plugin 2', description: 'Description 2' },
    ];
    fixture.detectChanges();
  
    const pluginCards = fixture.nativeElement.querySelectorAll('.plugin-card');
    expect(pluginCards.length).toEqual(2);
  
    const pluginNames = fixture.nativeElement.querySelectorAll('h5[name="pluginName"]');
    expect(pluginNames[0].textContent).toContain('Plugin 1');
    expect(pluginNames[1].textContent).toContain('Plugin 2');
  
    const pluginDescriptions = fixture.nativeElement.querySelectorAll('p[name="pluginDescription"]');
    expect(pluginDescriptions[0].textContent).toContain('Description 1');
    expect(pluginDescriptions[1].textContent).toContain('Description 2');
  });
});