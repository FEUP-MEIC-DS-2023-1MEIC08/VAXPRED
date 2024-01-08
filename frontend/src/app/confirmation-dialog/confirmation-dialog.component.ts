import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component representing a confirmation dialog.
 */
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Closes the dialog with a negative response.
   */
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * Closes the dialog with a positive response.
   */
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
