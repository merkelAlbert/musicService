import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NoveltiesHttpService {

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get('http://192.168.43.112:8080/getMetadataOfNewSongs').catch((err: any) => {
      console.log(err);
      return err;
    });
  }
}

// @Injectable()
// export class NoveltiesEventsService {
//
//   @Output() addToPlayer = new EventEmitter();
//
//   onAdd() {
//     this.addToPlayer.emit();
//   }
// }
