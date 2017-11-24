import {Component, OnInit} from '@angular/core';
import {SongItem} from '../shared/SongItem';
import {SongsHttpService, SongsEventsService, SongsViewService} from '../shared/Songs/songs.services';
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
    const buttons = document.getElementsByClassName('add');
    for (let i = 0; i < this.songItems.length; i++) {
      this.onAdd(this.songItems[i], (buttons[i] as HTMLElement));
    }
  }

  cancelAll() {
    this.eventsService.cancelAll();
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
  }

  toggleFindedButton() {
    if (FindedSongs.list.length > 0) {
      document.getElementById('findedSongsItem').style.display = 'block';
    } else  {
      document.getElementById('findedSongsItem').style.display = 'none';
    }
  }

  isLoaded(): boolean {
    this.songItems = FindedSongs.list;
    const result = this.eventsService.isLoaded(this.songItems);
    this.toggleFindedButton();
    return result;
  }

  playPauseSong(song: SongItem, button: any) {
    this.eventsService.playPauseSong(song, button);
  }
}
