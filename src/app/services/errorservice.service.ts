import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorserviceService {
  private errorSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  reportError(message: string) {
    this.errorSubject.next(message);
  }
}
