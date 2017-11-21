import {Component, OnInit} from '@angular/core';
import {SongItem} from '../shared/SongItem';
import {SongsHttpService, SongsEventsService, SongsViewService} from '../shared/Songs/songs.service';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';

@Component({
  selector: 'app-music-novelties',
  templateUrl: '../shared/Songs/songs.html',
  styleUrls: ['../shared/Songs/songs.styles.css'],
  providers: [SongsHttpService]
})

export class NoveltiesComponent implements OnInit {
  songItems: SongItem[] = [];
  serverRequestsUrls = ServerRequestsUrls;
  title = 'Новинки';
  observer: MutationObserver;

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

    this.httpService.getData(ServerRequestsUrls.Novelties).subscribe((data: any[]) => {
      for (let i = 0; i < data.length; i++) {
        this.songItems[i] = (new SongItem(data[i]['id'], data[i]['Artist'], data[i]['Title'], data[i]['Genre'],
          data[i]['Bitrate'], data[i]['Duration'], data[i]['Size'],
          new Date(Date.parse(data[i]['UploadDate'])), data[i]['CountOfDownload']));
      }
    });
  }

  isLoaded(): boolean {
    return this.eventsService.isLoaded(this.songItems);
  }

  playPauseSong(song: SongItem, button: any) {
    this.eventsService.playPauseSong(song, button);
  }
}
