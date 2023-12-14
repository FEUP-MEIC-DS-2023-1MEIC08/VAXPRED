import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPageComponent } from './admin-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatCardModule
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
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
