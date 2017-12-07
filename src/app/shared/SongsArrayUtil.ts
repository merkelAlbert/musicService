import {SongItem} from './SongItem';

export class SongsArrayUtil {
  public static indexOf(array: SongItem[], value: string): number {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === value) {
        return i;
      }
    }
    return -1;
  }

  public static delete(array: SongItem[], song: SongItem) {
    const index = SongsArrayUtil.indexOf(array, song.id);
    const tempSplice = array.splice(index, 1);
    const tempArr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].id !== tempSplice[0].id) {
        tempArr.push(array[i]);
      }
    }
    array = tempArr;
  }

  public static getCommonArray(local: SongItem[], inPlayer: SongItem[]): SongItem[] {
    const result = inPlayer.filter(function (el) {
      return this.has(el);
    }, new Set(local));
    return result;
  }

}
