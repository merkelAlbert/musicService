import {NgModule} from '@angular/core';
import {PlaylistSongsModule} from '../playlists/playlistSongs/playlistSongs.module';

@NgModule({
  imports: [PlaylistSongsModule],
  exports: [PlaylistSongsModule]
})
export class SharedModule {

}
