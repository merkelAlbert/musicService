import {HttpClient, HttpRequest, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {HttpEventType} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {ResponseHandler} from '../shared/ResponseHandler';

@Injectable()
export class UploaderHttpService {
  isUploading = new Subject<boolean>();
  isUploadingStream = this.isUploading.asObservable();
  progress = new Subject<number>();
  progressStream = this.progress.asObservable();

  constructor(private http: HttpClient) {
  }

  sendData(file: any) {
    const formData = new FormData();
    const myHeaders = new HttpHeaders();
    const myParams = new HttpParams();

    formData.append('file', file);

    myHeaders.append('Content-Type', 'multipart/form-data');
    const req = new HttpRequest('POST', ServerRequestsUrls.Add, formData, {
      headers: myHeaders,
      'reportProgress': true,
      'responseType': 'text'
    });
    this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.progress.next(percentDone);
          this.isUploading.next(true);
        } else if (event instanceof HttpResponse) {
          ResponseHandler.handle(event.body.toString());
          this.isUploading.next(false);
        }
      },
      res => {
          ResponseHandler.handle(res.error);
        this.isUploading.next(false);
      },
    );
  }
}
