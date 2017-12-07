import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {ResponseHandler} from '../ResponseHandler';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import {SongItem} from '../SongItem';
import {DeletedSongs, SongsInPlayer} from '../Lists';
import {SongsArrayUtil} from '../SongsArrayUtil';
import {ServerRequestsUrls} from '../ServerRequestsUrls';
import {ResponseContentType} from '@angular/http';

declare var System: any;

@Injectable()
export class SongsHttpService {
  id = new Subject<string>();
  idStream = this.id.asObservable();
  isSuccess = new Subject<boolean>();
  isSuccessStream = this.isSuccess.asObservable();

  constructor(private http: HttpClient) {
  }

  getData(url: string): SongItem [] {
    const songs = [];
    this.http.get(url).subscribe((data: any[]) => {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            songs.push(new SongItem(data[i]['id'], data[i]['Artist'], data[i]['Title'], data[i]['Genre'],
              data[i]['Bitrate'], data[i]['Duration'], data[i]['Size'],
              new Date(Date.parse(data[i]['UploadDate'])), data[i]['CountOfDownload']));
          }
        }
        this.isSuccess.next(true);
      },
      error => {
        ResponseHandler.handle(error);
        this.isSuccess.next(false);
      });
    return songs;
  }

  saveSongs(url: string, savedSongs: SongItem[]) {
    const playlistIds: string[] = [];
    for (let i = 0; i < savedSongs.length; i++) {
      playlistIds[i] = savedSongs[i].id;
    }

    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('Content-Type', 'application/x-www-form-urlencoded');
    form.setAttribute('action', ServerRequestsUrls.DownloadSongs);
    form.setAttribute('style', 'display: none;');

    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('name', 'ids');
    hiddenField.setAttribute('value', JSON.stringify(playlistIds));
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
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
    if (song.id === SongsEventsService.currentId) {
      SongsEventsService.pause();
    } else {
      button.style.backgroundImage = 'url(../assets/images/pause.png)';
      SongsEventsService.audio.src = ServerRequestsUrls.Listen + song.id;
      SongsEventsService.audio.currentTime = song.Duration / 3;
      SongsEventsService.currentId = song.id;
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
        if (SongsArrayUtil.indexOf(SongsInPlayer.list, allSongs[i].id) !== -1) {
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

