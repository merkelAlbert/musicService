import {Component, OnInit, OnDestroy} from '@angular/core';
import {SongItem} from '../shared/SongItem';
import {SongsHttpService, SongsEventsService, SongsViewService} from '../shared/Songs/songs.services';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {MenuItems} from '../shared/MenuItems';

declare var System: any;

@Component({
  selector: 'app-music-novelties',
  templateUrl: '../shared/Songs/songs.html',
  styleUrls: ['../shared/Songs/songs.styles.css'],
  providers: [SongsHttpService]
})

export class NoveltiesComponent implements OnInit, OnDestroy {
  songItems: SongItem[] = [];
  serverRequestsUrls = ServerRequestsUrls;
  title = MenuItems.novelties.name;
  observer: MutationObserver;
  isReceived: boolean[];

  constructor(private httpService: SongsHttpService, private eventsService: SongsEventsService,
              private viewService: SongsViewService) {
  }


  onAdd(song: SongItem, element: any) {
    if (!element.style.disabled) {
      this.eventsService.add(song);
      this.viewService.add(element);
    }
  }


  check() {
    if (this.songItems) {
      this.viewService.checkAdded(this.songItems);
    }
  }

  selectAll() {
    const buttons = document.getElementsByClassName('add');
    for (let i = 0; i < this.songItems.length; i++) {
      this.onAdd(this.songItems[i], (buttons[i] as HTMLElement));
    }
  }

  cancelAll() {
    this.eventsService.cancelAll(this.songItems);
    this.check();
  }

  ngOnInit() {
    const element = this;
    const elRef = document.getElementById('songs-container');
    this.observer = new MutationObserver(mutations => {
        element.check();
      }
    );
    const config = {attributes: true, childList: true, characterData: true};
    this.observer.observe(elRef, config);

    const response = this.httpService.getData(ServerRequestsUrls.Novelties);

    this.songItems = response.songs;
    this.isReceived = response.isSuccessfully;
  }

  isEmpty(): boolean {
    return this.songItems.length === 0 ? true : false;
  }

  isLoaded(): boolean {
    return this.isReceived[0];
  }

  playPauseSong(song: SongItem, button: any) {
    this.eventsService.playPauseSong(song, button);
  }

  ngOnDestroy() {
    SongsEventsService.pause();
    SongsEventsService.clearTimers();
  }
}
