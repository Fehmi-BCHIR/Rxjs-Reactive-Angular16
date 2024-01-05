import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {
    console.log('Loading service created ...');
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      //create a default observable just in order to be able to create an observable chain
      tap(() => this.loadingOn()), //after receiving the initial value "null" , start by turning on the loading indicator
      concatMap(() => obs$), // switch to outputting the values emitted by the input observable "obs$"
      finalize(() => this.loadingOff()) // when the input observable "obs$" stops emitting any values and completes turn off the loading indicator
    );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
