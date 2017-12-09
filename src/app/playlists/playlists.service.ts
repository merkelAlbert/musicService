import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseHandler} from '../shared/ResponseHandler';
import {SongItem} from '../shared/SongItem';
import {Subject} from 'rxjs/Subject';
import {PlaylistItem} from '../shared/PlaylistItem';

@Injectable()
export class PlaylistsHttpService {

  isSuccess = new Subject<boolean>();
  isSuccessStream = this.isSuccess.asObservable();

  constructor(private http: HttpClient) {
  }

  addPlaylist(url: string, name: string, songs: SongItem[]) {
    const playlistIds: string[] = [];
    for (let i = 0; i < songs.length; i++) {
      playlistIds[i] = songs[i].id;
    }

    const body = new FormData();
    body.append('name', name);
    body.append('ids', JSON.stringify(playlistIds));

    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'text/html');

    this.http.post(url, body, {
      headers: myHeaders,
    }).subscribe((res: Response) => {
        this.isSuccess.next(true);
        alert('Плейлист успешно сохранен');
      },
      error => {
        if (error.status === 0) {
          alert('Невозможно подключиться к серверу');
        } else {
          ResponseHandler.handle(error.error);
        }
        this.isSuccess.next(false);
      });
  }

  getPlaylists(url: string) {
    const playlists = [];
    this.http.get(url).subscribe((data: any[]) => {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            playlists.push(new PlaylistItem(data[i]['id'], data[i]['Name'], data[i]['IDs']));
          }
        }
        this.isSuccess.next(true);
      },
      error => {
        if (error.status === 0) {
          alert('Невозможно подключиться к серверу');
        } else {
          ResponseHandler.handle(error.error);
        }
        this.isSuccess.next(false);
      });
    return playlists;
  }
}
