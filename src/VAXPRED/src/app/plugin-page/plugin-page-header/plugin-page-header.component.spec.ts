import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginPageHeaderComponent } from './plugin-page-header.component';

describe('PluginPageHeaderComponent', () => {
  let component: PluginPageHeaderComponent;
  let fixture: ComponentFixture<PluginPageHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PluginPageHeaderComponent]
    });
    fixture = TestBed.createComponent(PluginPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
