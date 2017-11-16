import {Component, OnInit} from '@angular/core';
import {SongItem} from '../shared/SongItem';
import {NoveltiesHttpService} from './novelties.service';

declare var System: any;
System.import('./novelties.script.js');

@Component({
  selector: 'app-music-novelties',
  templateUrl: './novelties.html',
  styleUrls: ['./novelties.styles.css'],
  providers: [NoveltiesHttpService]
})
export class NoveltiesComponent implements OnInit {
  songItems: SongItem[] = [];

  constructor(private httpService: NoveltiesHttpService) {
  }

  // onAdd() {
  //   this.eventsService.onAdd();
  // }

  ngOnInit() {
    this.httpService.getData().subscribe((data: any[]) => {
      for (let i = 0; i < data.length; i++) {
        this.songItems[i] = (new SongItem(data[i]['id'], data[i]['Artist'], data[i]['Title'], data[i]['Genre'],
          data[i]['Bitrate'], data[i]['Duration'], data[i]['Size'], new Date(Date.parse(data[i]['UploadDate']))));
      }
    });
  }
}
