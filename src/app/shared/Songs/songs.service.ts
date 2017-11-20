import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ErrorHandler} from '../ErrorHandler';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {SongItem} from '../SongItem';
import {Songs} from '../Songs';
import {SongsArrayUtil} from '../SongsArrayUtil';

@Injectable()
export class SongsHttpService {

  constructor(private http: HttpClient) {
  }

  getData(url: string): Observable<any> {
    return this.http.get(url).catch((err: any) => {
      ErrorHandler.handleError(err.message);
      return err;
    });
  }
}

@Injectable()
export class SongsEventsService {
  song = new Subject<SongItem>();
  songStream = this.song.asObservable();

  add(song: SongItem) {
    this.song.next(song);
  }
}

@Injectable()
export class SongsViewService {

  checkAdded(allSongs: SongItem[]) {
    if (allSongs.length !== 0) {
      const allSongsButtons = document.getElementsByClassName('add');
      for (let i = 0; i < allSongs.length; i++) {
        if (SongsArrayUtil.indexOf(Songs.list, allSongs[i].Id) !== -1) {
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
  }
}

