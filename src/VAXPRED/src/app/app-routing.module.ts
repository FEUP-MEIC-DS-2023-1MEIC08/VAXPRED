import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WorkspaceComponent } from './workspace/workspace.component';

const routes: Routes = [
  { path: 'user', component: UserProfileComponent },
  { path: 'workspace/:id', component: WorkspaceComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
