export class PlaylistItem {
  private _id: string;
  private _title: string;
  private _ids: string[];

  public constructor(id, title, ids) {
    this._id = id;
    this._title = title;
    this._ids = ids;
  }

  get Id(): string {
    return this._id;
  }

  get Title(): string {
    if (this._title === '') {
      return 'Неизвестно';
    }
    return this._title;
  }

  get Ids(): string[] {
    return this._ids;
  }
}
