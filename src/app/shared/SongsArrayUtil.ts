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

  public static delete(array: SongItem[], song: SongItem) {
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

  public static deleteEmptySongs(array: SongItem[]) {
    const tempArr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].Id === '' &&
        array[i].Title === '' &&
        array[i].Duration === 0 &&
        array[i].Artist === '' &&
        array[i].Bitrate === '0kbps' &&
        array[i].CountOfDownloads === 0 &&
        array[i].Genre === '' &&
        array[i].Size === '0MB' &&
        array[i].UploadDate === ''
      ) {
        continue;
      }
      tempArr.push(array[i]);
    }
    array = tempArr;
  }
}
