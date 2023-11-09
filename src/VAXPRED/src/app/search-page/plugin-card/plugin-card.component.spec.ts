import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginCardComponent } from './plugin-card.component';

import { MatDialogModule } from '@angular/material/dialog';

describe('PluginCardComponent', () => {
  let component: PluginCardComponent;
  let fixture: ComponentFixture<PluginCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PluginCardComponent],
      imports:[MatDialogModule],
    });
    fixture = TestBed.createComponent(PluginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
