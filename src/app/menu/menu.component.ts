import {Component, Output, EventEmitter} from '@angular/core';
import {MenuItems} from '../shared/MenuItems';

declare var System: any;
System.import('./menu.script.js');


@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.styles.css']
})

export class MenuComponent {
  menuItems: Object[] = [
    MenuItems.index,
    MenuItems.novelties,
    MenuItems.topPlaylists,
    MenuItems.topSongs,
    MenuItems.upload
  ];
  @Output() choose = new EventEmitter();

  onChoose() {
    this.choose.emit();
  }
}
