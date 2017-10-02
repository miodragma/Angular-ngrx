import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.modulte';

import { reducers } from './store/app.reducers';
import { AuthEffects } from './adminDashboard/signin/store/auth.effects';
import { UploadEffects } from './adminDashboard/upload/store/upload.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, UploadEffects]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
