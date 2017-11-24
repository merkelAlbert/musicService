import {Component} from '@angular/core';
import {MenuItems} from '../shared/MenuItems';
import {SongsHttpService} from '../shared/Songs/songs.services';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {SongItem} from '../shared/SongItem';
import {FindedSongs, SongsInPlayer} from '../shared/Songs';

declare var System: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.styles.css'],
  providers: [SongsHttpService]
})
export class HeaderComponent {

  title = MenuItems.search.name;
  search = MenuItems.search.url;

  constructor(private httpService: SongsHttpService) {
  }

  onSend() {
    FindedSongs.list = this.httpService.getData(ServerRequestsUrls.Search
      + (document.getElementById('text') as HTMLTextAreaElement).value);
  }

  // nextSong() {
  //   System.import('../shared/player.script.js').then(script => {
  //     script.next();
  //   });
  // }
  //
  // prevSong() {
  //   System.import('../shared/player.script.js').then(script => {
  //     script.back();
  //   });
  // }
  //
  // playPauseSong() {
  //   System.import('../shared/player.script.js').then(script => {
  //     script.playPause();
  //   });
  // }

}
