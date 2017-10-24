import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MusicAppComponent} from './app.component';
import {PlayerComponent} from './player/player.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [MusicAppComponent, PlayerComponent],
  bootstrap: [MusicAppComponent]
})
export class AppModule {
}
