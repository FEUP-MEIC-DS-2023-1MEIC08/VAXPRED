import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'store', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'search/:categories', component: SearchPageComponent },
  
  { path: 'admin', component: AdminPageComponent },

  //Wild Card Route for 404 request
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
