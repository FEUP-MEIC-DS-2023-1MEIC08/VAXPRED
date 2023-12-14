import { Component, Input } from '@angular/core';
import { Plugin } from '../../plugin';
import { PluginPageComponent } from '../plugin-page.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ToolService } from 'src/app/plugin.service';

/**  
 * @Component for PluginPageHeaderComponent
 * Angular component responsible for displaying the header of a plugin page
 */
@Component({
  selector: 'app-plugin-page-header',
  templateUrl: './plugin-page-header.component.html',
  styleUrls: ['./plugin-page-header.component.css'],
})
export class PluginPageHeaderComponent {
  /**
   * Holds data related to the plugin being displayed on the page. Default value is an instance of Plugin with default values
   */
  @Input() plugin: Plugin = new Plugin(
    0,
    '',
    '',
    '',
    '',
    '',
    new Date(),
    new Date(),
    '',
    '',
    [],
    2,
    []
  );

  /**
   * Holds the reference to the contract dialog instance to control the opening/closing of the dialog
   */
  @Input() dialogRef!: MatDialogRef<PluginPageComponent>;

  /** 
   * Holds the current date
   */
  currentDate: Date = new Date();

  /** 
   * Holds the termination date of the contract (default value is the current date)
   */
  terminationDate: Date = new Date();

  /** 
   * Holds the service for plugin-related tools and functionalities
   */
  service: ToolService;

  /**
   * Constructor for PluginPageHeaderComponent
   * @param service Service handling plugin-related tools and functionalities
   */
  constructor(service: ToolService) {
    this.service = service;
    // Calculate the termination date (using contract duration)
    if (this.plugin.contract_duration && this.plugin.contract_duration > 0) {
      const terminationYears = this.plugin.contract_duration;
      const terminationDays = terminationYears * 365; // Assuming 365 days in a year

      this.terminationDate = new Date(this.currentDate);
      this.terminationDate.setDate(
        this.currentDate.getDate() + terminationDays
      );
    } else {
      // Default termination date if contract duration is not provided or invalid
      this.terminationDate = new Date(this.currentDate);
      this.terminationDate.setDate(this.currentDate.getDate() + 365); // Default: 1 year
    }
  }

  /**
   * Close the contract dialog when called
   */
  closeDialog() {
    this.dialogRef.close();
  }

  /**
   * Open the contract popup when called
   */
  openPopup() {
    const popupModal = document.getElementById('popup-modal');
    if (popupModal) {
      popupModal.style.display = 'block';
    }
  }

  /**
   * Handle the logic for contract acceptance
   */
  acceptContract() {
    const userId = 3; // TO DO replace with the actual user ID
    const userName = 'John Doe'; // TO DO replace with the actual user name

    // Handle the logic for contract acceptance here
    this.service.installPlugin(userId, userName, this.plugin.id, this.plugin.name).subscribe((data: any) => {
        console.log(data);
    });

    // This function should close the popup and initiate the download.
    this.closePopup();
    // Add code to initiate the download after the contract is accepted.
    // this.closeDialog();
}

  /**
   * Close the contract popup when called
   */
  closePopup() {
    const popupModal = document.getElementById('popup-modal');
    if (popupModal) {
      popupModal.style.display = 'none';
    }
  }
}
