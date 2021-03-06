import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Candidate } from './candidate';
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private candidateUrl = 'http://private-76432-jobadder1.apiary-mock.com/candidates';  // URL to web api
  errorMessage = '';

  constructor(
    private http: HttpClient,
    public errorHandler: ErrorHandlerService
  ) { }

  /** GET jobs from the server */
   getCandidates(): Observable<Candidate[]> {
     return this.http.get<Candidate[]>(this.candidateUrl)
       .pipe(
         tap(_ => console.log('fetched candidates')),
         catchError(this.handleError('getCandidates', []))
       );
   }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Complain in the UI
      this.errorHandler.complain(`${operation} failed: ${error.message}`);

      // keep app running by returning an empty result.
      return of(result as T);
    };
  }
}
