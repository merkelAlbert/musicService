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

  findPlaylists(form: any) {
    this.playlists = this.playlistsHttpService.getPlaylists(ServerRequestsUrls.SearchPlaylists + form.value.text);
    this.subscription = this.songsHttpService.isSuccessStream.subscribe(value => {
      if (value != null) {
        this.loaded = value;
      }
    });
  }

  isEmpty(): boolean {
    return this.playlists.length === 0 ? true : false;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  ngOnInit() {
    // const element = this;
    // const elRef = document.getElementById('songs-container');
    // const observer = new MutationObserver(() => {
    //     const temp = [];
    //     for (let i = 0; i < FindedSongs.list.length; i++) {
    //       temp.push(FindedSongs.list[i].Id);
    //     }
    //   }
    // );
    // const config = {attributes: true, childList: true, characterData: true};
    // observer.observe(elRef, config);
    // const el = this;
    // document.getElementById('text').addEventListener('change', function () {
    //   el.getSongs();
    // });
    // this.getSongs();
  }


}
