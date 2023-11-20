import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Plugin } from '../../plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { PluginPageMenuComponent } from './plugin-page-menu.component';

describe('PluginPageMenuComponent', () => {
  let component: PluginPageMenuComponent;
  let fixture: ComponentFixture<PluginPageMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PluginPageMenuComponent],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatTabsModule,
        MatListModule,
      ],
    });

    fixture = TestBed.createComponent(PluginPageMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set selectedTab and plugin inputs', () => {
    const testSelectedTab = 2;
    const testPlugin = new Plugin(1, 'Test Plugin', 'Test Description', 'Test Image', 'Test Type', ['Tag 1']);

    component.selectedTab = testSelectedTab;
    component.plugin = testPlugin;

    fixture.detectChanges();

    expect(component.selectedTab).toBe(testSelectedTab);
    expect(component.plugin).toEqual(testPlugin);
  });

  it('should display the plugin title', () => {
    const testTitle = 'Test Plugin Title';
    component.plugin = new Plugin(1, testTitle, 'Test Description', 'Test Image', 'Test Type', ['Tag 1']);
    fixture.detectChanges();
  
    const titleElement = fixture.nativeElement.querySelector('h3');
    expect(titleElement.textContent).toContain(testTitle);
  });
  
  it('should update selectedTab when a tab is clicked', async () => {
    await fixture.whenStable(); 

    const tabGroupHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      MatTabGroupHarness
    );

    const tabs = await tabGroupHarness.getTabs();
    expect(tabs.length).toBe(4);

    await tabs[1].select();
    fixture.detectChanges();
    expect(component.selectedTab).toBe(1);

    await tabs[2].select();
    fixture.detectChanges();
    expect(component.selectedTab).toBe(2);

    await tabs[3].select();
    fixture.detectChanges();
    expect(component.selectedTab).toBe(3);

    await tabs[0].select();
    fixture.detectChanges();
    expect(component.selectedTab).toBe(0);
  });
});