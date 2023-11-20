import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Plugin } from '../../plugin';
import { PluginPageComponent } from '../plugin-page.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ToolService } from 'src/app/plugin.service';


@Component({
  selector: 'app-plugin-page-header',
  templateUrl: './plugin-page-header.component.html',
  styleUrls: ['./plugin-page-header.component.css']
})
export class PluginPageHeaderComponent {
  @Input() plugin: Plugin = new Plugin(0, '', '', '', '', '', new Date(), new Date(), '', [], 2);
  @Input() dialogRef!: MatDialogRef<PluginPageComponent>;

  currentDate: Date = new Date();
  terminationDate: Date = new Date();
  service: ToolService;

  constructor(service: ToolService) {
    this.service = service;
    // Calculate the termination date (using contract duration)
    if (this.plugin.contract_duration && this.plugin.contract_duration > 0) {
      const terminationYears = this.plugin.contract_duration;
      const terminationDays = terminationYears * 365; // Assuming 365 days in a year

      this.terminationDate = new Date(this.currentDate);
      this.terminationDate.setDate(this.currentDate.getDate() + terminationDays);
    } else {
      // Default termination date if contract duration is not provided or invalid
      this.terminationDate = new Date(this.currentDate);
      this.terminationDate.setDate(this.currentDate.getDate() + 365); // Default: 1 year
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openPopup() {
    const popupModal = document.getElementById('popup-modal');
    if (popupModal) {
      popupModal.style.display = 'block';
    }
  }

  acceptContract() {
    // Handle the logic for contract acceptance here
    this.service.installPlugin(this.plugin.id).subscribe((data: any) => {
      console.log(data);
    });
    // This function should close the popup and initiate the download.
    this.closePopup();
    // Add code to initiate the download after the contract is accepted.
    //this.closeDialog();
  }

  closePopup() {
    const popupModal = document.getElementById('popup-modal');
    if (popupModal) {
      popupModal.style.display = 'none';
    }
  }
}

