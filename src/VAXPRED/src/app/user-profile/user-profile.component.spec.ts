import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],});
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user data', () => {
    component.user = { name: 'John Doe', title: 'Senior Researcher' };
    fixture.detectChanges();
    
    const nameElement = fixture.nativeElement.querySelector('h2');
    const titleElement = fixture.nativeElement.querySelector('.fw-medium');
    
    expect(nameElement.textContent).toContain('John Doe');
    expect(titleElement.textContent).toContain('Senior Researcher');
  });
  
  it('should trigger edit profile action', () => {
    spyOn(component, 'editProfile').and.callThrough();

    fixture.detectChanges(); 
    
    const editButton = fixture.nativeElement.querySelector('button[name="edit-profile-button"]');
    
    expect(editButton).toBeTruthy();

    editButton.click();
    
    expect(component.editProfile).toHaveBeenCalled();
  });
  
  it('should navigate to the next page', () => {
    spyOn(component, 'goToNextPage');

    const nextPageButton = fixture.nativeElement.querySelector('a[name="next-page-button"]');

    expect(nextPageButton).toBeTruthy();

    nextPageButton.click();

    expect(component.goToNextPage).toHaveBeenCalled();
  });

  it('should navigate to the previous page', () => {
    spyOn(component, 'goToPreviousPage');

    const previousPageButton = fixture.nativeElement.querySelector('a[name="previous-page-button"]');

    expect(previousPageButton).toBeTruthy();

    previousPageButton.click();

    expect(component.goToPreviousPage).toHaveBeenCalled();
  });

  it('should render plugin cards', () => {
    const pluginCards = fixture.nativeElement.querySelectorAll('.plugin-card'); //to adapt
    expect(pluginCards.length).toBeGreaterThan(0);
  });

  it('should trigger plugin details when a card is clicked', () => {
    spyOn(component, 'openPluginDetails');

    fixture.detectChanges();

    const pluginCards = fixture.nativeElement.querySelectorAll('.plugin-card'); //to adapt
    expect(pluginCards.length).toBeGreaterThan(0);

    pluginCards[0].click();

    expect(component.openPluginDetails).toHaveBeenCalled();
  });

});