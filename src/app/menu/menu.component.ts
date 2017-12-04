import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {MenuItems} from '../shared/MenuItems';
import {FindedSongs} from '../shared/Lists';

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

  onChoose() {
    this.choose.emit();
  }

  ngOnInit() {
    document.getElementById('findedSongsItem').style.display = 'none';
    document.getElementById('markedSongsItem').style.display = 'none';
  }
}
