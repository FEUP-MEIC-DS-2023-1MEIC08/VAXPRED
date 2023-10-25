import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginPageMenuComponent } from './plugin-page-menu.component';

describe('PluginPageMenuComponent', () => {
  let component: PluginPageMenuComponent;
  let fixture: ComponentFixture<PluginPageMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PluginPageMenuComponent]
    });
    fixture = TestBed.createComponent(PluginPageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
