import {Component, OnInit} from '@angular/core';
import {MenuItems} from '../shared/MenuItems';
import {PlaylistsHttpService} from './playlists.service';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {PlaylistItem} from '../shared/PlaylistItem';
import {Subscription} from 'rxjs/Subscription';
import {SongsEventsService, SongsHttpService} from '../shared/songs/songs.services';

@Component({
  selector: 'app-music-playlists',
  templateUrl: './playlists.html',
  styleUrls: ['./playlists.styles.css'],
  providers: [PlaylistsHttpService, SongsHttpService]
})
export class PlaylistsComponent implements OnInit {
  title = MenuItems.playlists.name;
  playlists: PlaylistItem[] = [];
  loaded = false;
  subscription: Subscription;

  constructor(private playlistsHttpService: PlaylistsHttpService,
              private songsHttpService: SongsHttpService,
              private songsEventsService: SongsEventsService) {

  }

  findPlaylists() {
    const name = (document.getElementById('playlistText')as HTMLTextAreaElement).value;
    if (name) {
      this.loaded = false;
      this.playlists = this.playlistsHttpService.getPlaylists(ServerRequestsUrls.SearchPlaylists
        + name);
      this.subscription = this.playlistsHttpService.isSuccessStream.subscribe(value => {
        if (value != null) {
          this.loaded = value;
        }
      });
    } else {
      this.playlists = [];
      this.loaded = true;
    }
  }


  showHideSongs(id: string) {
    const songs = document.getElementById(id);
    if (songs.style.display === 'none' || songs.style.display === '') {
      songs.style.display = 'block';
    } else {
      songs.style.display = 'none';
    }
  }

  isEmpty(): boolean {
    return this.playlists.length === 0 ? true : false;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  ngOnInit() {
    // const element = this;
    // const elRef = document.getElementById('playlists-container');
    // const observer = new MutationObserver(() => {
    //
    // );
    // const config = {attributes: true, childList: true, characterData: true};
    // observer.observe(elRef, config);
    const el = this;
    // document.getElementById('text').addEventListener('change', function () {
    //   el.getSongs();
    // });
    // this.getSongs();

    this.playlists = this.playlistsHttpService.getPlaylists(ServerRequestsUrls.GetPlaylists);
    this.subscription = this.playlistsHttpService.isSuccessStream.subscribe(value => {
      if (value === true) {
        this.loaded = value;
      } else {
        this.playlists = [];
        this.loaded = true;
      }
    });
    document.getElementById('playlistText').addEventListener('change', function () {
      el.findPlaylists();
    });
  }
}
