import {Injectable} from '@angular/core';

@Injectable()
export class MenuEventService {
  toggleButton(button: any, array: any[]) {
    if (array) {
      if (array.length) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    }
  }
}
