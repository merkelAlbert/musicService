import {Component, OnInit, OnDestroy} from '@angular/core';
import {SongItem} from '../shared/SongItem';
import {SongsHttpService, SongsEventsService, SongsViewService} from '../shared/songs/songs.services';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {FindedSongs, SongsInPlayer} from '../shared/Lists';
import {CookieService} from 'angular2-cookie/core';
import {Subscription} from 'rxjs/Subscription';
import {PlaylistsHttpService} from '../playlists/playlists.service';
import {MenuEventService} from '../menu/menu.service';
import {SongsArrayUtil} from '../shared/SongsArrayUtil';

declare var System: any;

@Component({
  selector: 'app-music-search',
  templateUrl: '../shared/songs/songs.html',
  styleUrls: ['../shared/songs/songs.styles.css'],
  providers: [SongsHttpService, PlaylistsHttpService, MenuEventService]
})

export class SearchComponent implements OnInit, OnDestroy {
  songItems: SongItem[] = [];
  serverRequestsUrls = ServerRequestsUrls;
  title = 'Найденные песни';
  loaded = false;
  subscription: Subscription;
  markedSongs: SongItem[] = [];

  constructor(private eventsService: SongsEventsService,
              private viewService: SongsViewService,
              private httpService: SongsHttpService,
              private playlistsHttpService: PlaylistsHttpService,
              private cookieService: CookieService,
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
    if (this.songItems) {
      this.viewService.checkAdded(this.songItems);
      // this.markedSongs = SongsArrayUtil.getCommonArray(this.songItems, SongsInPlayer.list);
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
      for (let i = 0; i < this.markedSongs.length; i++) {
      }
      // this.httpService.saveSongs(ServerRequestsUrls.DownloadSongs, this.markedSongs);
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

  getSongs() {
    const name = (document.getElementById('text') as HTMLTextAreaElement).value;
    if (name) {
      this.loaded = false;
      const response = this.httpService.getData(ServerRequestsUrls.Search
        + name);
      this.subscription = this.httpService.isSuccessStream.subscribe(value => {
        if (value === true) {
          FindedSongs.list = response;
          this.songItems = response;
          this.markedSongs = SongsArrayUtil.getCommonArray(this.songItems, SongsInPlayer.list);
          this.loaded = value;
        }
      });
    } else {
      FindedSongs.list = [];
      this.songItems = [];
      this.loaded = true;
    }
  }

  ngOnInit() {
    const element = this;
    const elRef = document.getElementById('songs-container');
    const observer = new MutationObserver(() => {
        const temp = [];
        for (let i = 0; i < FindedSongs.list.length; i++) {
          temp.push(FindedSongs.list[i].id);
        }
        element.cookieService.putObject(FindedSongs.toString(), temp);
        this.menuEventService.toggleButton(document.getElementById('findedSongsItem'), FindedSongs.list);
        element.check();
      }
    );
    const config = {attributes: true, childList: true, characterData: true};
    observer.observe(elRef, config);
    const el = this;
    document.getElementById('text').addEventListener('change', function () {
      el.getSongs();
    });
    this.getSongs();
  }

  isEmpty(): boolean {
    return this.songItems.length === 0 ? true : false;
  }

  isLoaded(): boolean {
    this.menuEventService.toggleButton(document.getElementById('findedSongsItem'), FindedSongs.list);
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
