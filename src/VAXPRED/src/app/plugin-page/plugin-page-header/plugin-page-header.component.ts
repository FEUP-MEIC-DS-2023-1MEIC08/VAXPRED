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
  @Input() plugin: Plugin = new Plugin(0, '', '', '', '', '', new Date(), new Date(), '', []);
  @Input() dialogRef!: MatDialogRef<PluginPageComponent>;

  currentDate: Date = new Date();
  terminationDate: Date = new Date();
  service: ToolService;

  constructor(service: ToolService) {
    // Calculate the termination date (2 years from the current date)
    this.terminationDate.setFullYear(this.currentDate.getFullYear() + 2);
    this.service = service;
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
    // This function should close the popup and initiate the download.
    this.service.installPlugin(this.plugin.id).subscribe((data: any) => {
      console.log(data);
    });
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

