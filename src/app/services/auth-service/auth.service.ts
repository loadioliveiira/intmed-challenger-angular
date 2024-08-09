import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected apiUrl = environment.apiUrl;

  constructor(protected httpClient: HttpClient) { }


  public login(username: string, password: string): Observable<any> {
    const body = {username, password};
    return this.httpClient.post(`${this.apiUrl}/users/login`, {body}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    throw error;
  }
}
