import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {ResponseHandler} from '../ResponseHandler';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import {SongItem} from '../SongItem';
import {DeletedSongs, SongsInPlayer} from '../Songs';
import {SongsArrayUtil} from '../SongsArrayUtil';
import {ServerRequestsUrls} from '../ServerRequestsUrls';
import {ServerResponse} from '../ServerResponse';

declare var System: any;

@Injectable()
export class SongsHttpService {

  constructor(private http: HttpClient) {
  }

  getData(url: string): ServerResponse {
    const songs = [];
    const isSuccessfully = [];
    this.http.get(url).retry(5).subscribe((data: any[]) => {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            songs.push(new SongItem(data[i]['id'], data[i]['Artist'], data[i]['Title'], data[i]['Genre'],
              data[i]['Bitrate'], data[i]['Duration'], data[i]['Size'],
              new Date(Date.parse(data[i]['UploadDate'])), data[i]['CountOfDownload']));
          }
        }
        isSuccessfully.push(true);
      },
      error => {
        isSuccessfully.push(false);
        ResponseHandler.handle(error);
      });
    return new ServerResponse(songs, isSuccessfully);
  }
}

@Injectable()
export class SongsEventsService {
  static currentButton: any;
  static currentId = '';
  static timers = [];
  static audio = null;
  song = new Subject<SongItem>();
  songStream = this.song.asObservable();

  static clearTimers() {
    for (let i = 0; i < SongsEventsService.timers.length; i++) {
      clearTimeout(SongsEventsService.timers[i]);
    }
    SongsEventsService.timers = [];
  }

  static pause() {
    if (SongsEventsService.audio) {
      SongsEventsService.audio.pause();
      SongsEventsService.audio.removeAttribute('src');
      SongsEventsService.currentId = '';
      SongsEventsService.currentId = '';
      SongsEventsService.currentButton = null;
    }
    System.import('../player.script.js').then(script => {
      if (script.isPlayed) {
        script.play();
      }
    });
  }

  add(song: SongItem) {
    this.song.next(song);
  }

  cancelAll(deletedSongs: SongItem[]) {
    DeletedSongs.list = deletedSongs;
    this.song.next(null);
  }

  isLoaded(songs: SongItem[]) {
    if (!songs) {
      return false;
    } else {
      return true;
    }
  }


  playPauseSong(song: SongItem, button: any) {
    if (SongsEventsService.currentButton) {
      SongsEventsService.currentButton.style.backgroundImage = 'url(../assets/images/play.png)';
    }
    if (SongsEventsService.timers.length) {
      SongsEventsService.clearTimers();
    }
    SongsEventsService.audio = document.getElementById('preListen') as HTMLAudioElement;
    if (song.Id === SongsEventsService.currentId) {
      SongsEventsService.pause();
    } else {
      button.style.backgroundImage = 'url(../assets/images/pause.png)';
      SongsEventsService.audio.src = ServerRequestsUrls.Listen + song.Id;
      SongsEventsService.audio.currentTime = song.Duration / 3;
      SongsEventsService.currentId = song.Id;
      SongsEventsService.currentButton = button;
      System.import('../player.script.js').then(script => {
        if (script.isPlayed) {
          script.pause();
        }
      });
      SongsEventsService.audio.load();
      SongsEventsService.audio.oncanplay = function () {
        SongsEventsService.audio.play();
        SongsEventsService.timers.push(setTimeout(function () {
          button.style.backgroundImage = 'url(../assets/images/play.png)';
          SongsEventsService.pause();
        }, 10000));
      };
    }
  }
}

@Injectable()
export class SongsViewService {

  checkAdded(allSongs: SongItem[]) {
    if (allSongs.length !== 0) {
      const allSongsButtons = document.getElementsByClassName('add');
      for (let i = 0; i < allSongs.length; i++) {
        if (SongsArrayUtil.indexOf(SongsInPlayer.list, allSongs[i].Id) !== -1) {
          this.add(allSongsButtons[i] as HTMLElement);
        } else {
          this.cancel(allSongsButtons[i] as HTMLElement);
        }
      }
    }
  }

  add(button: any) {
    button.style.backgroundColor = '#98FB98';
    button.style.backgroundImage = 'url(../../../assets/images/added.png)';
    button.style.backgroundSize = 'cover';
    button.style.cursor = 'auto';
    button.style.disabled = 'disabled';
  }

  cancel(button: any) {
    button.style.backgroundImage = 'url(../../../assets/images/add.png)';
    button.style.cursor = 'pointer';
    button.style.disabled = '';
    button.style.backgroundSize = '200px';
  }
}

