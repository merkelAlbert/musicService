import {Component, AfterViewChecked} from '@angular/core';
import {MenuItems} from './shared/MenuItems';
import {AppService} from './app.service';

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

  // addToPlayer() {
  //   alert("dfsdfd");
  // }
}
