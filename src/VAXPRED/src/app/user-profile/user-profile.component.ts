import { Component } from '@angular/core';

import { GridModule, CardModule, ButtonModule, AvatarModule, PaginationModule  } from '@coreui/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [
    GridModule, ButtonModule, AvatarModule, CardModule, PaginationModule
  ],
})
export class UserProfileComponent {

  user = {
    name: 'John Doe',
    title: 'Senior Researcher',
  };

  editProfile() {
    // Lógica de edição do perfil
  }

  goToNextPage() {
    // Lógica para ir para a próxima página
  }

  goToPreviousPage() {
    // Lógica para ir para a página anterior
  }

  constructor() { }
}
