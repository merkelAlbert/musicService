import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {MenuItems} from '../shared/MenuItems';
import {FindedSongs, SongsInPlayer} from '../shared/Lists';
import {AppHttpService} from '../app.services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.styles.css']
})

export class MenuComponent implements OnInit {
  findedSongs = FindedSongs.list;
  menuItems: Object[] = [
    MenuItems.index,
    MenuItems.novelties,
    MenuItems.playlists,
    MenuItems.topSongs,
    MenuItems.upload
  ];
  search = MenuItems.search.url;
  marked = MenuItems.marked.url;
  observer: MutationObserver;
  @Output() choose = new EventEmitter();

  constructor(private httpService: AppHttpService) {
  }

  onChoose() {
    this.choose.emit();
  }

  ngOnInit() {
    this.httpService.isSuccessStream.subscribe(value => {
      if (value === true) {
        if (SongsInPlayer.list.length) {
          document.getElementById('markedSongsItem').style.display = 'block';
        }
      }
    });

    document.getElementById('markedSongsItem').style.display = 'none';
    document.getElementById('findedSongsItem').style.display = 'none';
  }
}
