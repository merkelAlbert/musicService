import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {UploaderComponent} from './uploader.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  bootstrap: [UploaderComponent]
})
export class UploaderModule {

}
