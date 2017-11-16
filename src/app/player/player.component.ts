import {Component} from '@angular/core';
import {HttpService} from './player.service';
import {PlayerEventsService} from "./player.service";

declare var System: any;
System.import('./player.script.js');

@Component({
  selector: 'app-player',
  templateUrl: './player.html',
  styleUrls: ['./player.styles.css'],
  providers: [HttpService]
})
export class PlayerComponent {
  // addToPlayer() {
  //   alert("dfsdfd");
  // }
}
