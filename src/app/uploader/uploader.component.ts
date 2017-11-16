import {Component, ViewChild, ElementRef} from '@angular/core';
import {UploaderHttpService} from './uploader.service';

@Component({
  selector: 'app-music-uploader',
  templateUrl: './uploader.html',
  styleUrls: ['./uploader.styles.css'],
  providers: [UploaderHttpService]
})
export class UploaderComponent {

  constructor(private httpService: UploaderHttpService) {
  }

  @ViewChild('file')
  file: ElementRef;

  onSend() {
    const song = this.file.nativeElement.files[0];
    this.httpService.sendData(song);
  }
}
