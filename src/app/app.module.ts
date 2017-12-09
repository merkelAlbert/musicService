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
import {TopComponent} from './top/top.component';
import {SongsEventsService, SongsViewService} from './shared/songs/songs.services';
import {HeaderComponent} from './header/header.component';
import {SearchComponent} from './search/search.component';
import {CookieOptions, CookieService} from 'angular2-cookie/core';
import {PlaylistsComponent} from './playlists/playlists.component';
import {MarkedComponent} from './marked/marked.component';
import {MaterialModule} from './material.module';
import {AppHttpService} from './app.services';
import {SharedModule} from './shared/shared.module';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, AppRoutingModule,
    HttpClientModule, MaterialModule, SharedModule],
  declarations: [MusicAppComponent, PlayerComponent, MenuComponent, UploaderComponent,
    NoveltiesComponent, TopComponent, HeaderComponent, SearchComponent,
    PlaylistsComponent, MarkedComponent],
  bootstrap: [MusicAppComponent],
  providers: [SongsEventsService, SongsViewService, CookieService, {
    provide: CookieOptions,
    useValue: {}
  }, AppHttpService]
})
export class AppModule {
}
