import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get('user.json')
  }
}

@Injectable()
export class PlayerEventsService {

}
