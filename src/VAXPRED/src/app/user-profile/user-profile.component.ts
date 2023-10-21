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

  constructor() { }
}
