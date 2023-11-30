import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPagePluginFormComponent } from './admin-page-plugin-form.component';

describe('AdminPagePluginFormComponent', () => {
  let component: AdminPagePluginFormComponent;
  let fixture: ComponentFixture<AdminPagePluginFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPagePluginFormComponent]
    });
    fixture = TestBed.createComponent(AdminPagePluginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
