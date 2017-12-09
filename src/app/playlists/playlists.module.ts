import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PlaylistsComponent} from './playlists.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [BrowserModule, SharedModule],
  bootstrap: [PlaylistsComponent],
})
export class PlaylistsModule {
}
