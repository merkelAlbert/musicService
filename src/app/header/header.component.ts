import {Component} from '@angular/core';
import {MenuItems} from '../shared/MenuItems';
import {SongsHttpService} from '../shared/songs/songs.services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var System: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.styles.css'],
  providers: [SongsHttpService, FormBuilder]
})
export class HeaderComponent {

  form: FormGroup;
  title = MenuItems.search.name;
  search = MenuItems.search.url;

  constructor(private httpService: SongsHttpService, private builder: FormBuilder) {
    this.form = builder.group({
      'text': [null, Validators.required]
    });
  }

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

}
