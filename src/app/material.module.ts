import {NgModule} from '@angular/core';
import {
  MatProgressBarModule, MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {
}
