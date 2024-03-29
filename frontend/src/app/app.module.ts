import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PluginPageComponent } from './plugin-page/plugin-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { PluginPageMenuComponent } from './plugin-page/plugin-page-menu/plugin-page-menu.component';
import { PluginPageHeaderComponent } from './plugin-page/plugin-page-header/plugin-page-header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

// For API calls
import { HttpClientModule } from '@angular/common/http';
import { SearchPageComponent } from './search-page/search-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PluginCardComponent } from './search-page/plugin-card/plugin-card.component';
import { SideFilterComponent } from './search-page/side-filter/side-filter.component';
import { PluginPageImagesComponent } from './plugin-page/plugin-page-images/plugin-page-images.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { AdminPagePluginFormComponent } from './admin-page-plugin-form/admin-page-plugin-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PluginPageComponent,
    PluginPageMenuComponent,
    PluginPageHeaderComponent,
    PluginCardComponent,
    SearchPageComponent,
    NavbarComponent,
    SideFilterComponent,
    PluginPageImagesComponent,
    AdminPageComponent,
    PageNotFoundComponent,
    HomePageComponent,
    FooterComponent,
    AdminPagePluginFormComponent,
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
    HttpClientModule,
    MatTabsModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
