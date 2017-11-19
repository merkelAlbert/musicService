import {Injectable} from '@angular/core';
import {MenuItems} from './shared/MenuItems';

@Injectable()
export class AppService {
  togglePlayer() {
    const player = document.getElementById('app-player');
    if (window.location.pathname !== MenuItems.index.url) {
      player.style.display = 'none';
    } else {
      player.style.display = 'block';
    }
  }
}
