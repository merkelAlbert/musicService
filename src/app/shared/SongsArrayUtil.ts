import {SongItem} from './SongItem';

export class SongsArrayUtil {
  public static indexOf(array: SongItem[], value: string): number {
    for (let i = 0; i < array.length; i++) {
      if (array[i].Id === value) {
        return i;
      }
    }
    return -1;
  }
}
