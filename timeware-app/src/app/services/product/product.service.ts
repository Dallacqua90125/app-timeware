import { Products } from './../../models/Products';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.ApiUrl}Product`

  constructor( private http: HttpClient ) { }

  GetProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl).pipe(
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
