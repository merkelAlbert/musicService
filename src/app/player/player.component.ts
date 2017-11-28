import {Component, OnInit, ElementRef} from '@angular/core';
import {SongsEventsService} from '../shared/Songs/songs.services';
import {Subscription} from 'rxjs/Subscription';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {DeletedSongs, SongsInPlayer} from '../shared/Songs';
import {SongItem} from '../shared/SongItem';
import {SongsArrayUtil} from '../shared/SongsArrayUtil';


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

  constructor(private eventsService: SongsEventsService) {
  }

  ngOnInit() {
    const elRef = document.getElementById('playlist');
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function (mutation) {
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
