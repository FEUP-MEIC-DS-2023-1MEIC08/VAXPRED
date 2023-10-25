import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { PluginPageComponent } from './plugin-page/plugin-page.component';

const routes: Routes = [
  { path: 'user', component: UserProfileComponent },
  { path: 'workspace/:id', component: WorkspaceComponent},
  { path: 'plugin/:id', component: PluginPageComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
