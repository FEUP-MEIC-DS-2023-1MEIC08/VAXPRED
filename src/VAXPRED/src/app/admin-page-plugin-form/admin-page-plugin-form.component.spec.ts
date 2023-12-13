import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPagePluginFormComponent } from './admin-page-plugin-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AdminPagePluginFormComponent', () => {
  let component: AdminPagePluginFormComponent;
  let fixture: ComponentFixture<AdminPagePluginFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPagePluginFormComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatChipsModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {} 
        }
      ]
    });
    fixture = TestBed.createComponent(AdminPagePluginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
