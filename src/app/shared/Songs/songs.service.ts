import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorHandler} from '../ErrorHandler';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SongsHttpService {

  constructor(private http: HttpClient) {
  }

  getData(url: string): Observable<any> {
    return this.http.get(url).catch((err: any) => {
      ErrorHandler.handleError(err.message);
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
