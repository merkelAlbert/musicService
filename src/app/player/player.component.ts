import {Component, OnInit, ElementRef} from '@angular/core';
import {SongsEventsService, SongsHttpService} from '../shared/songs/songs.services';
import {Subscription} from 'rxjs/Subscription';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {DeletedSongs, SongsInPlayer} from '../shared/Lists';
import {SongItem} from '../shared/SongItem';
import {SongsArrayUtil} from '../shared/SongsArrayUtil';
import {CookieService} from 'angular2-cookie/core';
import {AppHttpService} from '../app.services';

declare var System: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.html',
  styleUrls: ['./player.styles.css'],
  providers: [SongsHttpService]
})
export class PlayerComponent implements OnInit {
  subscription: Subscription;
  serverRequestsUrls = ServerRequestsUrls;
  observer: MutationObserver;
  songs = [];
  cookiesSubscription: Subscription;

  constructor(private eventsService: SongsEventsService,
              private cookieService: CookieService,
              private httpService: AppHttpService) {
  }

  ngOnInit() {
    this.songs = SongsInPlayer.list;
    const elRef = document.getElementById('playlist');
    this.observer = new MutationObserver(mutations => {
      const temp = [];
      for (let i = 0; i < SongsInPlayer.list.length; i++) {
        temp.push(SongsInPlayer.list[i].id);
      }
      this.cookieService.putObject(SongsInPlayer.toString(), temp);
      System.import('../shared/player.script.js').then(script => {
        script.initTracks();
      });
    });
    const config = {attributes: true, childList: true, characterData: true};
    this.observer.observe(elRef, config);
    this.subscription = this.eventsService.songStream.subscribe(data => {
      if (data) {
        SongsInPlayer.list.push(data);
      } else {
        const length = DeletedSongs.list.length;
        const temp = [];
        for (let i = 0; i < length; i++) {
          temp[i] = DeletedSongs.list[i];
        }
        for (let i = 0; i < length; i++) {
          SongsArrayUtil.delete(SongsInPlayer.list, temp[i]);
        }
        DeletedSongs.list = [];
      }
      this.songs = SongsInPlayer.list;
    });
    this.cookiesSubscription = this.httpService.isSuccessStream.subscribe(value => {
      if (value === true) {
        this.songs = SongsInPlayer.list;
      }
    });
  }

  onDelete(song: SongItem) {
    SongsArrayUtil.delete(SongsInPlayer.list, song);
  }
}
