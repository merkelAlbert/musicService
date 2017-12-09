import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PlaylistSongsComponent} from './playlistSongs.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [PlaylistSongsComponent],
  bootstrap: [PlaylistSongsComponent],
  exports: [PlaylistSongsComponent]
})
export class PlaylistSongsModule {
}
