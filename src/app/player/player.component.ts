import {Component, OnInit, ElementRef} from '@angular/core';
import {SongsEventsService} from '../shared/songs/songs.services';
import {Subscription} from 'rxjs/Subscription';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {DeletedSongs, SongsInPlayer} from '../shared/Lists';
import {SongItem} from '../shared/SongItem';
import {SongsArrayUtil} from '../shared/SongsArrayUtil';
import {CookieService} from 'angular2-cookie/core';


declare var System: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.html',
  styleUrls: ['./player.styles.css']
})
export class PlayerComponent implements OnInit {
  subscription: Subscription;
  serverRequestsUrls = ServerRequestsUrls;
  observer: MutationObserver;
  songs = SongsInPlayer.list;

  constructor(private eventsService: SongsEventsService, private cookieService: CookieService) {
  }

  ngOnInit() {
    const component = this;
    const elRef = document.getElementById('playlist');
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function (mutation) {
        const temp = [];
        for (let i = 0; i < SongsInPlayer.list.length; i++) {
          temp.push(SongsInPlayer.list[i].Id);
        }
        component.cookieService.putObject(SongsInPlayer.toString(), temp);
        System.import('../shared/player.script.js').then(script => {
          script.initTracks();
        });
      });
    });
    const config = {attributes: true, childList: true, characterData: true};
    this.observer.observe(elRef, config);
    this.subscription = this.eventsService.songStream.subscribe(data => {
      if (data) {
        SongsInPlayer.list.push(data);
      } else {
        const length = DeletedSongs.list.length;
        for (let i = 0; i < length; i++) {
          SongsArrayUtil.delete(SongsInPlayer.list, DeletedSongs.list[i]);
        }
        DeletedSongs.list = [];
      }
    });
  }

  onDelete(song: SongItem) {
    SongsArrayUtil.delete(SongsInPlayer.list, song);
  }
}
