import {Component, AfterViewChecked, OnInit} from '@angular/core';
import {AppService} from './app.services';

@Component({
  selector: 'app-music',
  templateUrl: './app.html',
  styleUrls: ['./app.styles.css'],
  providers: [AppService]
})

export class MusicAppComponent implements AfterViewChecked {

  constructor(private service: AppService) {
  }

  ngAfterViewChecked() {
    this.service.togglePlayer();
  }

  choose() {
    this.service.togglePlayer();
  }

}
