import {Response} from '@angular/http';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs';

export class ErrorHandler {
  static handleError(error: Response | any) {
    let errorMessage: string;
    if (error instanceof Response) {
      errorMessage = `Erro ${error.status} ao obter a URL ${error.url} - ${error.statusText}`;
    } else {
      errorMessage = error.toString;
    }
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}
