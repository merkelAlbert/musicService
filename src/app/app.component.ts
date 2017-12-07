import {Component, AfterViewChecked, OnInit} from '@angular/core';
import {AppHttpService, AppService} from './app.services';
import {CookieService} from 'angular2-cookie/core';
import {FindedSongs, SongsInPlayer} from './shared/Lists';
import {ServerRequestsUrls} from './shared/ServerRequestsUrls';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-music',
  templateUrl: './app.html',
  styleUrls: ['./app.styles.css'],
  providers: [AppService]
})

export class MusicAppComponent implements OnInit, AfterViewChecked {
  subscription: Subscription;

  constructor(private service: AppService,
              private cookieService: CookieService,
              private httpService: AppHttpService) {
  }

  ngOnInit() {
    const inPlayer: any = this.cookieService.getObject(SongsInPlayer.toString());
    const finded: any = this.cookieService.getObject(FindedSongs.toString());
    const ids = [];
    if (inPlayer) {
      for (let i = 0; i < inPlayer.length; i++) {
        ids[i] = inPlayer[i];
      }
      const temp = this.httpService.getSongsByIds(ServerRequestsUrls.SongsByIds, ids);
      this.subscription = this.httpService.isSuccessStream.subscribe(value => {
        if (value === true) {
          SongsInPlayer.list = temp;
        }
      });
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
