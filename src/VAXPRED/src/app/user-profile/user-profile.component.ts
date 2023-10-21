import { Component } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { GridModule } from '@coreui/angular';
import { ButtonModule } from '@coreui/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule,
    GridModule, ButtonModule
  ],
})
export class UserProfileComponent {

  constructor() { }
}
