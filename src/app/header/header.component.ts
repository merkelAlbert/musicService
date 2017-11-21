import {Component} from '@angular/core';

declare var System: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.styles.css']
})
export class HeaderComponent {

  // nextSong() {
  //   System.import('../shared/player.script.js').then(script => {
  //     script.next();
  //   });
  // }
  //
  // prevSong() {
  //   System.import('../shared/player.script.js').then(script => {
  //     script.back();
  //   });
  // }
  //
  // playPauseSong() {
  //   System.import('../shared/player.script.js').then(script => {
  //     script.playPause();
  //   });
  // }

  menu() {
    System.import('../menu/menu.script.js').then(script => {
      script.menuInOut();
    });
  }
}
