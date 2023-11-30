import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { UserProfileService } from '../user-profile.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

// TEMP - logged in user ID
const loggedUserId = 1;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [
    CommonModule, MatGridListModule, FlexLayoutModule, MatCardModule, MatDividerModule, RouterModule
  ],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private userProfileService: UserProfileService,
    private dialog: MatDialog
  ) { }

  user = {
    id : loggedUserId,
    name: 'Loading...',
    title: '',
    org: ''
  }

  plugins: any[] = [];

  ngOnInit(): void {
    console.log("init");
    this.userProfileService.getUser(loggedUserId).subscribe((user: any) => {
      console.log(user);
      this.user.name = user['username'];
      // TEMP
      this.user.title = user['email'];
      this.user.org = user['email'];
    });

    this.userProfileService.getUserPlugins(loggedUserId).subscribe((data) => {
      console.log(data);
      this.plugins = data;
    })
  }

  removePlugin(plugin: any) {
    this.userProfileService.removePlugin(loggedUserId, plugin.id).subscribe((data) => {
      console.log(data);
      // Refresh the page
      window.location.reload();
    })
  }

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

  editProfile() {
    // Lógica de edição do perfil
  }

  goToNextPage() {
    // Lógica para ir para a próxima página
  }

  goToPreviousPage() {
    // Lógica para ir para a página anterior
  }

  onPageChange(){

  }
}
