import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/Users';
// import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.ApiUrl}Users`

  constructor( private http: HttpClient ) { }

  GetUsers() : Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }
  CreateUsers(userData: any): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, userData)
  }
}
