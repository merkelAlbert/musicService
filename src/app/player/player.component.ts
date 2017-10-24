import {Component} from '@angular/core';

declare var System: any;
System.import('../../../node_modules/jquery/dist/jquery.min.js');
System.import('./html5media.js');
System.import('./player.component.script.js');

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
}
