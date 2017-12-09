import {Injectable} from '@angular/core';
import {MenuItems} from './shared/MenuItems';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SongItem} from './shared/SongItem';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AppService {
  togglePlayer() {
    const player = document.getElementById('app-player');
    if (window.location.hash !== '#' + MenuItems.index.url) {
      player.style.display = 'none';
    } else {
      player.style.display = 'block';
    }
  }
}

@Injectable()
export class AppHttpService {

  isSuccess = new Subject<boolean>();
  isSuccessStream = this.isSuccess.asObservable();

  inPlayerLoaded = new Subject<boolean>();
  inPlayerLoadedStream = this.inPlayerLoaded.asObservable();

  constructor(private http: HttpClient) {
  }

  getSongsByIds(url, ids: string[]): SongItem[] {
    const result = [];
    const body = new FormData();
    body.append('ids', JSON.stringify(ids));

    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'text/html');

    this.http.post(url, body, {
      headers: myHeaders,
    }).subscribe((res: SongItem[]) => {
        if (res) {
          for (let i = 0; i < res.length; i++) {
            result.unshift(new SongItem(res[i]['id'], res[i]['Artist'], res[i]['Title'], res[i]['Genre'],
              res[i]['Bitrate'], res[i]['Duration'], res[i]['Size'],
              new Date(Date.parse(res[i]['UploadDate'])), res[i]['CountOfDownload']));
          }
        }
        this.isSuccess.next(true);
      },
      error => {
        this.isSuccess.next(false);
      });
    return result;
  }

}
