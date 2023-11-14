import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  { path: 'profile', component: UserProfileComponent },
  //{ path: 'store', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
