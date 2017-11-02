import {Component} from '@angular/core';

declare var System: any;
System.import('./app.component.script.js');

const menuItems = [
  'Плеер',
  'Топ песен',
  'Топ плейлистов',
  'Новинки'

];

@Component({
  selector: 'app-music',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class MusicAppComponent {
  menuItems: string[] = menuItems;
}
