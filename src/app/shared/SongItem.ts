export class SongItem {
  private _id: string;
  private _title: string;
  private _artist: string;
  private _genre: string;
  private _bitrate: number;
  private _duration: number;
  private _size: number;
  private _uploadDate: any;

  public constructor(id, artist, title, genre, bitrate, duration, size, uploadDate) {
    this._id = id;
    this._artist = artist;
    this._title = title;
    this._genre = genre;
    this._bitrate = bitrate;
    this._duration = duration;
    this._size = size;
    this._uploadDate = uploadDate;
  }

  get Id(): string {
    return this._id;
  }

  get Artist(): string {
    return this._artist;
  }

  get Title(): string {
    return this._title;
  }

  get Genre(): string {
    return this._genre;
  }

  get Bitrate(): string {
    return this._bitrate + ' ' + 'kbps';
  }

  get Duration(): string {
    if (isNaN(this._duration)) {
      return '0:00';
    }
    const sec = Math.round(this._duration);
    const min = Math.floor(sec / 60);
    if (sec - min * 60 < 10) {
      return min + ':0' + (sec - min * 60);
    }
    return min + ':' + (sec - min * 60);
  }

  get Size(): string {
    return (this._size / 1024 / 1024).toFixed(2) + ' ' + 'MB';
  }

  get UploadDate(): string {
    return this._uploadDate.getDate() + '.' + this._uploadDate.getMonth() + '.' + this._uploadDate.getFullYear();
  }
}
