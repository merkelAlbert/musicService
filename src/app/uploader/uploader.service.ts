import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ErrorHandler} from '../shared/ErrorHandler';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ServerRequestsUrls} from '../shared/ServerRequestsUrls';

@Injectable()
export class UploaderHttpService {
  constructor(private http: HttpClient) {
  }


  sendData(file: any) {
    const formData = new FormData();
    const myHeaders = new HttpHeaders();
    formData.append('file', file);

    myHeaders.append('enctype', 'multipart/form-data');
    return this.http.post(ServerRequestsUrls.Add, formData, {
      headers: myHeaders
    }).subscribe(res => {
        alert(res);
      },
      error => {
        ErrorHandler.handleError(error);
      }
    );
  }
}
