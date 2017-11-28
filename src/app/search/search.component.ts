import {Component, OnInit} from '@angular/core';
import {SongItem} from '../shared/SongItem';
import {SongsHttpService, SongsEventsService, SongsViewService} from '../shared/Songs/songs.services';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {FindedSongs} from '../shared/Songs';
import {ServerResponse} from '../shared/ServerResponse';

@Component({
  selector: 'app-music-search',
  templateUrl: '../shared/Songs/songs.html',
  styleUrls: ['../shared/Songs/songs.styles.css'],
  providers: [SongsHttpService]
})

export class SearchComponent implements OnInit {
  songItems = null;
  serverRequestsUrls = ServerRequestsUrls;
  title = 'Найденные песни';
  isReceived: boolean[];
  response: ServerResponse = null;

  constructor(private eventsService: SongsEventsService,
              private viewService: SongsViewService, private httpService: SongsHttpService) {
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

  getSongs() {
    this.response = this.httpService.getData(ServerRequestsUrls.Search
      + (document.getElementById('text') as HTMLTextAreaElement).value);
    FindedSongs.list = this.response.songs;
    this.isReceived = this.response.isSuccessfully;
    this.songItems = this.response.songs;
  }


  ngOnInit() {
    const element = this;
    const elRef = document.getElementById('songs-container');
    const observer = new MutationObserver(() => {
        element.check();
      }
    );
    const config = {attributes: true, childList: true, characterData: true};
    observer.observe(elRef, config);
    const el = this;
    document.getElementById('text').addEventListener('change', function () {
      el.getSongs();
    });
    this.getSongs();
  }

  toggleFindedButton() {
    if (FindedSongs.list.length > 0) {
      document.getElementById('findedSongsItem').style.display = 'block';
    } else {
      document.getElementById('findedSongsItem').style.display = 'none';
    }
  }

  isEmpty(): boolean {
    console.log(this.songItems.length);
    return this.songItems.length === 0 ? true : false;
  }

  isLoaded(): boolean {
    console.log(this.isReceived[0]);
    this.toggleFindedButton();
    return this.isReceived[0];
  }

  playPauseSong(song: SongItem, button: any) {
    this.eventsService.playPauseSong(song, button);
  }
}
