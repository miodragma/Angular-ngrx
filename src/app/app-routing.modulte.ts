import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './webApp/home/home.component';
import { SigninComponent } from './adminDashboard/signin/signin.component';
import { GalleryComponent } from './webApp/gallery/gallery.component';
import { AboutComponent } from './webApp/about/about.component';
import { ContactComponent } from './webApp/contact/contact.component';
import { SidemenuComponent } from './adminDashboard/sidemenu/sidemenu.component';
import { UploadComponent } from './adminDashboard/upload/upload.component';
import { HeaderComponent } from './adminDashboard/admin-header/admin-header.component';
import { WebHeaderComponent } from './webApp/web-header/web-header.component';

import { AuthGuardService } from './adminDashboard/signin/auth-guard.service';

import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ImageUploadModule } from 'angular2-image-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material.module';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'signin', component: SigninComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'adminDashboard', component: SidemenuComponent, children: [
    { path: 'upload', component: UploadComponent }
  ], canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    HeaderComponent,
    SidemenuComponent,
    UploadComponent,
    SigninComponent,
    WebHeaderComponent,
    HomeComponent,
    GalleryComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ImageUploadModule.forRoot(),
    Ng2ImgMaxModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    WebHeaderComponent,
    HeaderComponent,
    RouterModule
  ],
  providers: [AuthGuardService]
})

export class AppRoutingModule {}
