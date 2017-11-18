import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorHandler} from '../shared/ErrorHandler';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ServerResponses} from '../shared/ServerResponses';

@Injectable()
export class TopHttpService {

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get(ServerResponses.Top).catch((err: any) => {
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
