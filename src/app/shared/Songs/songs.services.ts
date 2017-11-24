import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {ResponseHandler} from '../ResponseHandler';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {SongItem} from '../SongItem';
import {SongsInPlayer} from '../Songs';
import {SongsArrayUtil} from '../SongsArrayUtil';
import {ServerRequestsUrls} from '../ServerRequestsUrls';

@Injectable()
export class SongsHttpService {

  constructor(private http: HttpClient) {
  }

  getData(url: string): SongItem[] {
    const songs: SongItem[] = [];
    this.http.get(url).subscribe((data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          songs[i] = (new SongItem(data[i]['id'], data[i]['Artist'], data[i]['Title'], data[i]['Genre'],
            data[i]['Bitrate'], data[i]['Duration'], data[i]['Size'],
            new Date(Date.parse(data[i]['UploadDate'])), data[i]['CountOfDownload']));
        }
      },
      (error: Error) => {
        ResponseHandler.handle(error);
      });
    return songs;
  }
}

@Injectable()
export class SongsEventsService {
  static currentButton: any;
  static currentId = '';
  static timer = null;

  song = new Subject<SongItem>();
  songStream = this.song.asObservable();

  static pause(audio: HTMLAudioElement) {
    audio.pause();
    audio.removeAttribute('src');
    SongsEventsService.currentId = '';
    SongsEventsService.timer = null;
    SongsEventsService.currentId = '';
    SongsEventsService.currentButton = null;
  }

  add(song: SongItem) {
    this.song.next(song);
  }

  cancelAll() {
    this.song.next(null);
  }

  isLoaded(songs: SongItem[]) {
    if (songs.length) {
      return true;
    } else {
      return false;
    }
  }


  playPauseSong(song: SongItem, button: any) {
    if (SongsEventsService.currentButton) {
      SongsEventsService.currentButton.style.backgroundImage = 'url(../assets/images/play.png)';
    }
    const audio = document.getElementById('preListen') as HTMLAudioElement;
    if (SongsEventsService.timer !== null) {
      clearTimeout(SongsEventsService.timer);
    }
    if (song.Id === SongsEventsService.currentId) {
      SongsEventsService.pause(audio);
    } else {
      button.style.backgroundImage = 'url(../assets/images/pause.png)';
      audio.src = ServerRequestsUrls.Download + song.Id;
      audio.currentTime = song.Duration / 3;
      SongsEventsService.currentId = song.Id;
      SongsEventsService.currentButton = button;
      audio.play();

      SongsEventsService.timer = setTimeout(function () {
        button.style.backgroundImage = 'url(../assets/images/play.png)';
        SongsEventsService.pause(audio);
      }, 10000);
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

