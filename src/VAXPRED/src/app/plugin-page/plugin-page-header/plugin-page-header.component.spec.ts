import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Plugin } from '../../plugin';

import { PluginPageHeaderComponent } from './plugin-page-header.component';

describe('PluginPageHeaderComponent', () => {
  let component: PluginPageHeaderComponent;
  let fixture: ComponentFixture<PluginPageHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PluginPageHeaderComponent],
    });

    fixture = TestBed.createComponent(PluginPageHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the plugin title', () => {
    const testTitle = 'Test Plugin Title';
    const testPlugin = new Plugin(1, testTitle, 'Test Description', 'Test Path', 'Test Version', 'Test Developer', new Date(), new Date(), 'Test Type', ['Tag 1'], 2);

    component.plugin = testPlugin;
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain(testTitle);
  });

  it('should display the plugin version tag', () => {
    const testVersion = '1.0.7';
    const testPlugin = new Plugin(1, 'Test Plugin', 'Test Description', 'Test Path', 'Test Version', 'Test Developer', new Date(), new Date(), 'Test Type', ['Tag 1'], 2);

    component.plugin = testPlugin;

    fixture.detectChanges();

    const versionElement = fixture.nativeElement.querySelector('.plugin-version-tag');
    expect(versionElement.textContent).toBe(testVersion);
  });

  it('should display the plugin ID', () => {
    const testID = 42;
    const testPlugin = new Plugin(testID, 'Test Plugin', 'Test Description', 'Test Path', 'Test Version', 'Test Developer', new Date(), new Date(), 'Test Type', ['Tag 1'], 2);

    component.plugin = testPlugin;
    fixture.detectChanges();

    const idElement = fixture.nativeElement.querySelector('h4');
    expect(idElement.textContent).toContain(`Plugin #${testID}`);
  });

  it('should display an install button', () => {
    const testPlugin = new Plugin(1, 'Test Plugin', 'Test Description', 'Test Path', 'Test Version', 'Test Developer', new Date(), new Date(), 'Test Type', ['Tag 1'], 2);

    component.plugin = testPlugin;
    fixture.detectChanges();

    const installButton = fixture.nativeElement.querySelector('#install-plugin');
    expect(installButton).toBeTruthy();
  });
});
