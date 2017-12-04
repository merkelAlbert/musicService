import {Component, ViewChild, ElementRef, AfterContentInit} from '@angular/core';
import {UploaderHttpService} from './uploader.service';

@Component({
  selector: 'app-music-uploader',
  templateUrl: './uploader.html',
  styleUrls: ['./uploader.styles.css'],
  providers: [UploaderHttpService]
})
export class UploaderComponent implements AfterContentInit {

  isLoaded = true;

  constructor(private httpService: UploaderHttpService) {
  }

  @ViewChild('file')
  file: ElementRef;

  onSend(): any {
    this.isLoaded = false;
    const song = this.file.nativeElement.files[0];
    this.httpService.sendData(song);
    this.isLoaded = true;
  }

  ngAfterContentInit() {
    (document.getElementById('file')as HTMLInputElement).onchange = function () {
      (document.getElementById('uploadFile') as HTMLInputElement).value =
        (this as HTMLInputElement).value.replace('C:\\fakepath\\', '');
    };
  }
}
