import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MusicAppComponent} from './app.component';
import {PlayerComponent} from './player/player.component';
import {MenuComponent} from './menu/menu.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing-module';
import {UploaderComponent} from './uploader/uploader.component';
import {NoveltiesComponent} from './novelties/novelties.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, AppRoutingModule, HttpClientModule],
  declarations: [MusicAppComponent, PlayerComponent, MenuComponent, UploaderComponent, NoveltiesComponent],
  bootstrap: [MusicAppComponent]
})
export class AppModule {
}
