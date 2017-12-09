import {Component, OnInit, OnDestroy} from '@angular/core';
import {SongItem} from '../shared/SongItem';
import {SongsHttpService, SongsEventsService, SongsViewService} from '../shared/songs/songs.services';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {MenuItems} from '../shared/MenuItems';
import {SongsInPlayer} from '../shared/Lists';
import {Subscription} from 'rxjs/Subscription';
import {PlaylistsHttpService} from '../playlists/playlists.service';
import {MenuEventService} from '../menu/menu.service';
import {SongsArrayUtil} from '../shared/SongsArrayUtil';

@Component({
  selector: 'app-music-novelties',
  templateUrl: '../shared/songs/songs.html',
  styleUrls: ['../shared/songs/songs.styles.css'],
  providers: [SongsHttpService, PlaylistsHttpService, MenuEventService]
})

export class TopComponent implements OnInit, OnDestroy {
  songItems: SongItem[] = [];
  serverRequestsUrls = ServerRequestsUrls;
  title = MenuItems.topSongs.name;
  observer: MutationObserver;
  subscription: Subscription;
  loaded = false;
  markedSongs: SongItem[] = [];

  constructor(private httpService: SongsHttpService, private eventsService: SongsEventsService,
              private viewService: SongsViewService, private playlistsHttpService: PlaylistsHttpService,
              private menuEventService: MenuEventService) {
  }

  onAdd(song: SongItem, element: any) {
    if (!element.style.disabled) {
      this.eventsService.add(song);
      this.viewService.add(element);
      this.markedSongs.push(song);
    }
    this.menuEventService.toggleButton(document.getElementById('markedSongsItem'), SongsInPlayer.list);
  }


  check() {
    if (this.songItems.length) {
      this.viewService.checkAdded(this.songItems);
      this.markedSongs = SongsArrayUtil.getCommonArray(this.songItems, SongsInPlayer.list);
    }
  }

  selectAll() {
    const buttons = document.getElementsByClassName('add');
    for (let i = 0; i < this.songItems.length; i++) {
      this.onAdd(this.songItems[i], (buttons[i] as HTMLElement));
    }
  }

  saveSongs() {
    if (this.markedSongs.length > 1) {
      this.httpService.saveSongs(ServerRequestsUrls.DownloadSongs, this.markedSongs);
    }
  }

  addPlaylist(form: any) {
    if (form.value.text) {
      this.playlistsHttpService.addPlaylist(ServerRequestsUrls.AddPlaylist, form.value.text, this.markedSongs);
    }
  }

  showSavingForm() {
    if (SongsInPlayer.list.length > 1) {
      document.getElementById('addPlaylistForm').style.display = 'flex';
    }
  }

  hideSavingForm() {
    document.getElementById('addPlaylistForm').style.display = 'none';
  }

  cancelAll() {
    this.eventsService.cancelAll(this.songItems);
    this.hideSavingForm();
    this.check();
    this.menuEventService.toggleButton(document.getElementById('markedSongsItem'), this.markedSongs);
  }

  ngOnInit() {
    const element = this;
    const elRef = document.getElementById('songs-container');
    this.observer = new MutationObserver(mutations => {
        element.check();
      }
    );
    const config = {attributes: true, childList: true, characterData: true};
    this.observer.observe(elRef, config);

    this.songItems = this.httpService.getData(ServerRequestsUrls.Top);
    this.subscription = this.httpService.isSuccessStream.subscribe(value => {
      if (value != null) {
        this.markedSongs = SongsArrayUtil.getCommonArray(this.songItems, SongsInPlayer.list);
        this.loaded = value;
      }
    });
  }

  isEmpty(): boolean {
    return this.songItems.length === 0 ? true : false;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  playPauseSong(song: SongItem, button: any) {
    this.eventsService.playPauseSong(song, button);
  }

  ngOnDestroy() {
    SongsEventsService.pause();
    SongsEventsService.clearTimers();
  }
}
