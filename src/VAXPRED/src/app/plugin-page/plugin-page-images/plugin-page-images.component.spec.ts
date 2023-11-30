import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginPageImagesComponent } from './plugin-page-images.component';

describe('PluginPageImagesComponent', () => {
  let component: PluginPageImagesComponent;
  let fixture: ComponentFixture<PluginPageImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PluginPageImagesComponent]
    });
    fixture = TestBed.createComponent(PluginPageImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
