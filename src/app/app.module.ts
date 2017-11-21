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
import {SongsEventsService, SongsViewService} from './shared/Songs/songs.service';
import {HeaderComponent} from './header/header.component';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, AppRoutingModule, HttpClientModule],
  declarations: [MusicAppComponent,  PlayerComponent, MenuComponent, UploaderComponent, NoveltiesComponent, TopComponent,  HeaderComponent],
  bootstrap: [MusicAppComponent],
  providers: [SongsEventsService, SongsViewService]
})
export class AppModule {
}
