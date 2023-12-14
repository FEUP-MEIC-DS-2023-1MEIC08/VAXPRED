import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { UserProfileService } from '../user-profile.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

// TEMP - logged in user ID which is an admin
const loggedUserId = 1;

/**
 * Component representing the user profile.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [
    CommonModule, MatGridListModule, FlexLayoutModule, MatCardModule, MatDividerModule, RouterModule, MatButtonModule
  ],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private userProfileService: UserProfileService,
    private dialog: MatDialog
  ) { }

  /** Indicates whether data is loading. */
  isLoading = true;

  /** Represents the user's profile information. */
  user = {
    id : loggedUserId,
    name: 'Loading...',
    email: '',
    isAdmin: false,
  }

  /** Holds plugins related to the user. */
  plugins: any[] = [];

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    console.log("init");
    this.userProfileService.getUser(loggedUserId).subscribe((user: any) => {
      console.log(user);
      this.user.name = user['username'];
      this.user.email = user['email'];
      this.user.isAdmin = true;

      this.isLoading = false;
    });

    this.userProfileService.getUserPlugins(loggedUserId).subscribe((data) => {
      console.log(data);
      this.plugins = data;
    })
  }

  /**
   * Removes a plugin associated with the user.
   * @param plugin The plugin to be removed.
   */
  removePlugin(plugin: any) {
    this.userProfileService.removePlugin(loggedUserId, plugin.id).subscribe((data) => {
      console.log(data);
      // Refresh the page
      window.location.reload();
    })
  }

  /**
   * Opens a confirmation dialog for plugin removal.
   * @param plugin The plugin to be removed.
   */
  openConfirmationDialog(plugin: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '35em',
      data: { pluginName: plugin.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked "Yes" in the confirmation dialog, remove the plugin
        this.removePlugin(plugin);
      }
    });
  }

  /**
   * Handles user's profile edition.
   */
  editProfile() {
    // Lógica de edição do perfil
  }

  /**
   * Handles navigation to the next page.
   */
  goToNextPage() {
    // Lógica para ir para a próxima página
  }

  /**
   * Handles navigation to the previous page.
   */
  goToPreviousPage() {
    // Lógica para ir para a página anterior
  }

  /**
   * Handles page change event.
   */
  onPageChange(){

  }
}