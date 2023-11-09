import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, CardModule, ButtonModule, AvatarModule, PaginationModule  } from '@coreui/angular';
import { HttpClient } from '@angular/common/http';

import { UserProfileService } from '../user-profile.service';

// TEMP - logged in user ID
const loggedUserId = 1;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [
    GridModule, ButtonModule, AvatarModule, CardModule, PaginationModule, CommonModule
  ],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private userProfileService: UserProfileService
  ) { }

  user = {
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
    })

    // Refresh the page
    window.location.reload();
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
