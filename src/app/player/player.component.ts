import {Component, AfterViewInit, ElementRef} from '@angular/core';
import {SongsEventsService} from '../shared/Songs/songs.service';
import {Subscription} from 'rxjs/Subscription';
import {SongItem} from '../shared/SongItem';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';

declare var System: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.html',
  styleUrls: ['./player.styles.css']
})
export class PlayerComponent implements AfterViewInit {
  subscription: Subscription;
  songsList: SongItem[] = [];
  serverRequestsUrls = ServerRequestsUrls;
  observer: MutationObserver;

  constructor(private eventsService: SongsEventsService, private elRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function () {
        System.import('./player.script.js').then(script => {
          script.initTracks();
        });
      });
    });
    const config = {attributes: true, childList: true, characterData: true};
    this.observer.observe(this.elRef.nativeElement, config);

    this.subscription = this.eventsService.songStream.subscribe(data => {
      this.songsList.push(data);
    });
  }

}
