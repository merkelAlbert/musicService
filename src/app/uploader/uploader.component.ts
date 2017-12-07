import {Component, ViewChild, ElementRef, AfterContentInit} from '@angular/core';
import {UploaderHttpService} from './uploader.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-music-uploader',
  templateUrl: './uploader.html',
  styleUrls: ['./uploader.styles.css'],
  providers: [UploaderHttpService]
})
export class UploaderComponent implements AfterContentInit {

  uploadingSubscription: Subscription;
  uploading = false;
  progress = 0;
  progressSubscription: Subscription;

  constructor(private httpService: UploaderHttpService) {
  }

  @ViewChild('file')
  file: ElementRef;

  onSend(): any {
    const song = this.file.nativeElement.files[0];
    this.httpService.sendData(song);
  }

  isUploading() {
    return this.uploading;
  }


  ngAfterContentInit() {
    this.uploadingSubscription = this.httpService.isUploadingStream.subscribe(value => {
      if (value != null) {
        this.uploading = value;
      }
    });
    this.progressSubscription = this.httpService.progressStream.subscribe(value => {
      if (value != null) {
        this.progress = value;
      }
    });
    (document.getElementById('file')as HTMLInputElement).onchange = function () {
      (document.getElementById('uploadFile') as HTMLInputElement).value =
        (this as HTMLInputElement).value.replace('C:\\fakepath\\', '');
    };
  }
}
