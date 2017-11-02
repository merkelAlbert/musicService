import {Component} from '@angular/core';

declare var System: any;
System.import('./player.component.script.js');

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
}
