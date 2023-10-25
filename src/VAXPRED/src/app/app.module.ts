import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { PluginPageComponent } from './plugin-page/plugin-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { PluginPageMenuComponent } from './plugin-page/plugin-page-menu/plugin-page-menu.component';
import { PluginPageHeaderComponent } from './plugin-page/plugin-page-header/plugin-page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    WorkspaceComponent,
    SideMenuComponent,
    PluginPageComponent,
    PluginPageMenuComponent,
    PluginPageHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
