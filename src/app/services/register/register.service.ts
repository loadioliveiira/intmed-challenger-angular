import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  protected apiUrl = environment.apiUrl;
  
  constructor(protected httpClient: HttpClient) { }

  public register(username: string, email: string, password: string): Observable<any> {
    const body = {username, email, password};
    return this.httpClient.post(`${this.apiUrl}/users`, {body}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    // Trate o erro aqui e retorne um observable apropriado
    console.error('Ocorreu um erro:', error);
    throw error;
  }
}
