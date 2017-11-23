import {Component, OnInit} from '@angular/core';
import {SongItem} from '../shared/SongItem';
import {SongsHttpService, SongsEventsService, SongsViewService} from '../shared/Songs/songs.service';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {MenuItems} from '../shared/MenuItems';
import {FindedSongs} from '../shared/Songs';

@Component({
  selector: 'app-music-search',
  templateUrl: '../shared/Songs/songs.html',
  styleUrls: ['../shared/Songs/songs.styles.css'],
})

export class SearchComponent implements OnInit {
  songItems = [];
  serverRequestsUrls = ServerRequestsUrls;
  title = 'Найденные песни';
  observer: MutationObserver;

  constructor(private eventsService: SongsEventsService,
              private viewService: SongsViewService) {
  }


  onAdd(song: SongItem, element: any) {
    if (!element.style.disabled) {
      this.eventsService.add(song);
      this.viewService.add(element);
    }
  }


  check() {
    this.viewService.checkAdded(this.songItems);
  }

  selectAll() {
    document.getElementById('selectAll').style.display = 'none';
    const buttons = document.getElementsByClassName('add');
    for (let i = 0; i < this.songItems.length; i++) {
      this.onAdd(this.songItems[i], (buttons[i] as HTMLElement));
    }
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
  }

  isLoaded(): boolean {
    this.songItems = FindedSongs.list;
    return this.eventsService.isLoaded(this.songItems);
  }

  playPauseSong(song: SongItem, button: any) {
    this.eventsService.playPauseSong(song, button);
  }
}
