import {Component, AfterViewChecked, OnInit} from '@angular/core';
import {AppService} from './app.services';
import {CookieService} from 'angular2-cookie/core';
import {FindedSongs, SongsInPlayer} from './shared/Lists';

@Component({
  selector: 'app-music',
  templateUrl: './app.html',
  styleUrls: ['./app.styles.css'],
  providers: [AppService]
})

export class MusicAppComponent implements OnInit, AfterViewChecked {

  constructor(private service: AppService, private cookieService: CookieService) {
  }

  ngOnInit() {
    const inPlayer: any = this.cookieService.getObject(SongsInPlayer.toString());
    const finded: any = this.cookieService.getObject(FindedSongs.toString());
    if (inPlayer) {
      console.log(inPlayer.length);
      for (let i = 0; i < inPlayer.length; i++) {
        console.log(inPlayer[i]);
      }
    }
    if (finded) {
      console.log('finded');
      for (let i = 0; i < finded.length; i++) {
        console.log(finded[i]);
      }
    }
  }

  ngAfterViewChecked() {
    this.service.togglePlayer();
  }

  choose() {
    this.service.togglePlayer();
  }

}
