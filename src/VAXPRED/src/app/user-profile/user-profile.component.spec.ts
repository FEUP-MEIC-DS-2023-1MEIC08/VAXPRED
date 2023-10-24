import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent]
    });
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
    
    const nameElement = fixture.nativeElement.querySelector('.user-name');
    const titleElement = fixture.nativeElement.querySelector('.user-title');
    
    expect(nameElement.textContent).toContain('John Doe');
    expect(titleElement.textContent).toContain('Senior Researcher');
  });
  
  it('should trigger edit profile action', () => {
    spyOn(component, 'editProfile');
    
    const editButton = fixture.nativeElement.querySelector('.edit-profile-button');
    editButton.click();
    
    expect(component.editProfile).toHaveBeenCalled();
  });
  
  it('should navigate to the next page', () => {
    spyOn(component, 'goToNextPage');
    const nextPageButton = fixture.nativeElement.querySelector('.next-page-button');
    nextPageButton.click();
    expect(component.goToNextPage).toHaveBeenCalled();
  });
});