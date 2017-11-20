import {Component, OnInit, ElementRef} from '@angular/core';
import {SongsEventsService} from '../shared/Songs/songs.service';
import {Subscription} from 'rxjs/Subscription';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {Songs} from '../shared/Songs';
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
  songs = Songs.list;

  constructor(private eventsService: SongsEventsService) {
  }

  ngOnInit() {
    const elRef = document.getElementById('playlist');
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function (mutation) {
        System.import('./player.script.js').then(script => {
          script.initTracks();
        });
      });
    });
    const config = {attributes: true, childList: true, characterData: true};
    this.observer.observe(elRef, config);
    this.subscription = this.eventsService.songStream.subscribe(data => {
      Songs.list.push(data);
    });
  }

  onDelete(song: SongItem) {
    const index = SongsArrayUtil.indexOf(Songs.list, song.Id);
    Songs.list = Songs.list.splice(index, 1);
  }
}
