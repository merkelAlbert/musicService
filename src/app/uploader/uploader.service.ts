import {HttpClient, HttpRequest, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';
import {HttpEventType} from '@angular/common/http';

@Injectable()
export class UploaderHttpService {
  constructor(private http: HttpClient) {
  }

  sendData(file: any) {
    const formData = new FormData();
    const myHeaders = new HttpHeaders();
    formData.append('file', file);

    myHeaders.append('Content-Type', 'multipart/form-data');

    // const req = new HttpRequest('POST', ServerRequestsUrls.Add,
    //   formData
    // }, {
    //   headers: myHeaders,
    // });

    this.http.post(ServerRequestsUrls.Add, formData, {
      headers: myHeaders
    }).subscribe(res => {
      },
      error => {
        alert(error.statusText);
      });
  }
}
