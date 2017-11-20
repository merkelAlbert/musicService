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

  public static  delete(array: SongItem[], song: SongItem) {
    const index = SongsArrayUtil.indexOf(array, song.Id);
    const tempSplice = array.splice(index, 1);
    const tempArr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].Id !== tempSplice[0].Id) {
        tempArr.push(array[i]);
      }
    }
    array = tempArr;
  }
}
