import { Injectable } from '@angular/core';
import { User } from './classes/user';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  public static host = 'http://192.168.0.7:3000/';

  constructor(public http:HttpClient) { }

  register(picture:File, user:User): Observable<User>{
    const headers = new HttpHeaders();
    const form = new FormData();
    form.append('picture',picture,picture.name);
    form.append('user',JSON.stringify(user));
    return this.http.post<User>(UserService.host + 'users', form, {headers, withCredentials:true}).pipe(
      catchError(this.handleError)
    );
  }

  login(user:User): Observable<User>{
    const headers = new HttpHeaders();
    return this.http.post<User>(UserService.host + 'users/login',user, {headers, withCredentials:true}).pipe(
      map(user => {
        if(user){
          localStorage.setItem('currentUser',JSON.stringify(user));
        }
        return user;
      })
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
