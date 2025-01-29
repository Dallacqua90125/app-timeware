import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Users } from '../../models/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.ApiUrl}Users`

  constructor( private http: HttpClient ) { }

  GetUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  CreateUsers(userData: any): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, userData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      return throwError('Este email já está em uso.');
    } else if (error.status === 400) {
      return throwError('Dados inválidos. Por favor, verifique os dados fornecidos.');
    } else {
      return throwError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
    }
  }
}
