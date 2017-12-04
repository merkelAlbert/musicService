import {SongItem} from './SongItem';
import {PlaylistItem} from './PlaylistItem';

export class SongsInPlayer {
  public static list: SongItem[] = [];
}

export class FindedSongs {
  public static list: SongItem[] = null;
}

export class DeletedSongs {
  public static list: SongItem[] = [];
}

export class FindedPlaylists {
  public static list: PlaylistItem[] = [];
}
