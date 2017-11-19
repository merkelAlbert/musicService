import {Component, OnInit} from '@angular/core';
import {SongItem} from '../shared/SongItem';
import {SongsHttpService, SongsEventsService} from '../shared/Songs/songs.service';
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

  constructor(private httpService: SongsHttpService, private eventsService: SongsEventsService) {
  }


  onAdd(song: SongItem) {
    this.eventsService.add(song);
  }

  ngOnInit() {
    this.httpService.getData(ServerRequestsUrls.Novelties).subscribe((data: any[]) => {
      for (let i = 0; i < data.length; i++) {
        this.songItems[i] = (new SongItem(data[i]['id'], data[i]['Artist'], data[i]['Title'], data[i]['Genre'],
          data[i]['Bitrate'], data[i]['Duration'], data[i]['Size'],
          new Date(Date.parse(data[i]['UploadDate'])), data[i]['CountOfDownload']));
      }
    });
  }

}
