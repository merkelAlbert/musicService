import {Component, OnInit, OnDestroy, Input, ViewChild, ElementRef} from '@angular/core';
import {SongItem} from '../../shared/SongItem';
import {SongsHttpService, SongsEventsService, SongsViewService} from '../../shared/songs/songs.services';
import {ServerRequestsUrls} from '../../shared/ServerRequestsUrls';
import {MenuItems} from '../../shared/MenuItems';
import {SongsInPlayer} from '../../shared/Lists';
import {Subscription} from 'rxjs/Subscription';
import {PlaylistsHttpService} from '../../playlists/playlists.service';
import {MenuEventService} from '../../menu/menu.service';
import {SongsArrayUtil} from '../../shared/SongsArrayUtil';
import {AppHttpService} from "../../app.services";

@Component({
  selector: 'app-music-playlist-songs',
  templateUrl: './playlistSongs.html',
  styleUrls: ['./playlistSongs.styles.css', '../../shared/songs/songs.styles.css'],
  providers: [SongsHttpService, PlaylistsHttpService, MenuEventService]
})

export class PlaylistSongsComponent implements OnInit, OnDestroy {
  songItems: SongItem[] = [];
  serverRequestsUrls = ServerRequestsUrls;

  @ViewChild('content')
  content: ElementRef;

  @ViewChild('addPlaylistForm')
  addPlaylistForm: ElementRef;

  @Input() ids: string[];

  observer: MutationObserver;
  playerObserver: MutationObserver;
  loaded = false;
  subscription: Subscription;
  markedSongs: SongItem[] = [];
  id = Math.random().toString(36).substr(2, 9);

  constructor(private songsHttpService: SongsHttpService, private eventsService: SongsEventsService,
              private viewService: SongsViewService, private playlistsHttpService: PlaylistsHttpService,
              private menuEventService: MenuEventService,
              private appHttpService: AppHttpService) {
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
      this.viewService.checkAddedInPlaylist(this.id, this.songItems);
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
      this.songsHttpService.saveSongs(ServerRequestsUrls.DownloadSongs, this.markedSongs);
    }
  }

  showSavingForm() {
    if (SongsInPlayer.list.length > 1) {
      this.addPlaylistForm.nativeElement.style.display = 'flex';
    }
  }

  hideSavingForm() {
    this.addPlaylistForm.nativeElement.style.display = 'none';
  }

  addPlaylist(form: any) {
    if (form.value.text) {
      this.playlistsHttpService.addPlaylist(ServerRequestsUrls.AddPlaylist, form.value.text, this.markedSongs);
    }
  }

  cancelAll() {
    this.eventsService.cancelAll(this.markedSongs);
    this.hideSavingForm();
    this.check();
    this.menuEventService.toggleButton(document.getElementById('markedSongsItem'), SongsInPlayer.list);
  }

  ngOnInit() {
    this.content.nativeElement.id = this.id;
    const element = this;
    const elRef = this.content.nativeElement;
    this.observer = new MutationObserver(mutations => {
        element.check();
      }
    );
    const config = {attributes: true, childList: true, characterData: true};
    this.observer.observe(elRef, config);

    const player = document.getElementById('playlist');
    this.playerObserver = new MutationObserver(mutations => {
        element.check();
      }
    );
    const playerConfig = {attributes: true, childList: true, characterData: true};
    this.playerObserver.observe(player, playerConfig);

    this.songItems = this.appHttpService.getSongsByIds(ServerRequestsUrls.SongsByIds, this.ids);
    this.subscription = this.appHttpService.isSuccessStream.subscribe(value => {
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
