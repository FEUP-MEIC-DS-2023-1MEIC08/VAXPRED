import { Component, OnInit } from '@angular/core';

import { GridModule, CardModule, ButtonModule, AvatarModule, PaginationModule  } from '@coreui/angular';

import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [
    GridModule, ButtonModule, AvatarModule, CardModule, PaginationModule
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

  user_plugins = [];

  ngOnInit(): void {
    console.log("init");
    this.userProfileService.getUser(1).subscribe((user: any) => {
      console.log(user);
      this.user.name = user['username'];
      // TEMP
      this.user.title = user['email'];
      this.user.org = user['email'];
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

  openPluginDetails(){

  }
}
