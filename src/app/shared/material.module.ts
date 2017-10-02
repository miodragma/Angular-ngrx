import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule, MdDialogModule, MdGridListModule, MdIconModule, MdInputModule, MdMenuModule, MdProgressBarModule,
  MdProgressSpinnerModule, MdSidenavModule, MdSnackBarModule, MdToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdMenuModule,
    MdSnackBarModule,
    MdProgressBarModule,
    MdDialogModule,
    MdInputModule,
    MdGridListModule,
    MdCardModule,
    MdProgressSpinnerModule
  ],
  exports: [
    MdButtonModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdMenuModule,
    MdSnackBarModule,
    MdProgressBarModule,
    MdDialogModule,
    MdInputModule,
    MdGridListModule,
    MdCardModule,
    MdProgressSpinnerModule
  ]
})

export class MaterialModule {}
