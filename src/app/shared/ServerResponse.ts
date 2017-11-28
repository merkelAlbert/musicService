import {SongItem} from './SongItem';

export class ServerResponse {
  public songs: SongItem[];
  public isSuccessfully: boolean[];

  public constructor(songs: SongItem[], isSuccessfully: boolean[]) {
    this.songs = songs;
    this.isSuccessfully = isSuccessfully;
  }
}
