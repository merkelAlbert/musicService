import {Component, OnInit, OnDestroy} from '@angular/core';
import {SongItem} from '../shared/SongItem';
import {SongsHttpService, SongsEventsService, SongsViewService} from '../shared/songs/songs.services';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {SongsInPlayer} from '../shared/Lists';
import {Subscription} from 'rxjs/Subscription';
import {PlaylistsHttpService} from '../playlists/playlists.service';
import {MenuEventService} from '../menu/menu.service';

declare var System: any;

@Component({
  selector: 'app-music-marked',
  templateUrl: '../shared/songs/songs.html',
  styleUrls: ['../shared/songs/songs.styles.css'],
  providers: [SongsHttpService, PlaylistsHttpService, MenuEventService]
})
export class MarkedComponent implements OnInit, OnDestroy {
  songItems: SongItem[] = [];
  serverRequestsUrls = ServerRequestsUrls;
  title = 'Выделенные песни';
  loaded = true;
  subscription: Subscription;

  constructor(private eventsService: SongsEventsService,
              private viewService: SongsViewService,
              private httpService: SongsHttpService,
              private playlistsHttpService: PlaylistsHttpService,
              private menuEventService: MenuEventService) {
  }


  onAdd(song: SongItem, element: any) {
    if (!element.style.disabled) {
      this.eventsService.add(song);
      this.viewService.add(element);
    }
    this.menuEventService.toggleButton(document.getElementById('markedSongsItem'), SongsInPlayer.list);
  }


  check() {
    if (this.songItems) {
      this.viewService.checkAdded(this.songItems);
    }
  }

  selectAll() {
    const buttons = document.getElementsByClassName('add');
    for (let i = 0; i < this.songItems.length; i++) {
      this.onAdd(this.songItems[i], (buttons[i] as HTMLElement));
    }
  }

  saveSongs() {
    if (SongsInPlayer.list.length) {
      this.httpService.saveSongs(ServerRequestsUrls.DownloadSongs, SongsInPlayer.list);
      this.subscription = this.httpService.idStream.subscribe(value => {
        if (value) {
          this.eventsService.downloadSongs(value);
        }
      });
    }
  }

  addPlaylist(form: any) {
    if (form.value.text) {
      this.playlistsHttpService.addPlaylist(ServerRequestsUrls.AddPlaylist, form.value.text, SongsInPlayer.list);
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
    this.menuEventService.toggleButton(document.getElementById('markedSongsItem'), SongsInPlayer.list);
  }


  ngOnInit() {
    const element = this;
    for (let i = 0; i < SongsInPlayer.list.length; i++) {
      this.songItems[i] = SongsInPlayer.list[i];
    }
    const elRef = document.getElementById('songs-container');
    const observer = new MutationObserver(() => {
      element.check();
    });
    const config = {attributes: true, childList: true, characterData: true};
    observer.observe(elRef, config);
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
