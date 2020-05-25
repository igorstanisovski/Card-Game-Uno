import { Injectable } from '@angular/core';
import { User } from './classes/user';
import { HttpClient,HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
  
  gameStart(username:string): Observable<User>{
    const headers = new HttpHeaders();
    let body = new HttpParams();
    body = body.set('username', username);
    //form.append('username',JSON.stringify(username));
    return this.http.post<User>(UserService.host + 'users/start',body,{headers,withCredentials:true});
  }
  
  gameWon(username:string):Observable<User> {
    const headers = new HttpHeaders();
    let body = new HttpParams();
    body = body.set('username', username);
    //form.append('username',JSON.stringify(username));
    return this.http.post<User>(UserService.host + 'users/win',body,{headers,withCredentials:true});
  }

  editProfile(user:User): Observable<User>{
    const headers = new HttpHeaders();
    let body = new HttpParams();
    body = body.set('user', JSON.stringify(user));
    return this.http.post<User>(UserService.host + 'users/editprofile',body,{headers,withCredentials:true}).pipe(
      map(user => {
        if(user){
          localStorage.setItem('currentUser',JSON.stringify(user));
        }
        return user;
      }),
      catchError(this.handleError)
    );
  }

  changePassowrd(checkPassword:string, newPassword:string, user:User): Observable<User>{
    const headers = new HttpHeaders();
    let body = new HttpParams();
    body = body.set('user',JSON.stringify(user));
    body = body.set('checkPassword',checkPassword);
    body = body.set('newPassword',newPassword);
    return this.http.post<User>(UserService.host + 'users/changepassword',body, {headers,withCredentials:true});
  }

  changeProfilePicture(picture:File,user_id:string): Observable<User> {
    const headers = new HttpHeaders();
    const form = new FormData();
    form.append('picture',picture,picture.name);
    return this.http.post<User>(UserService.host + 'users/changeprofilepicture/'+user_id, form, {headers, withCredentials:true}).pipe(
      map(user => {
          if(user){
            localStorage.setItem('currentUser',JSON.stringify(user));
          }
          return user;
      })
    )
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

  public getUser (_id:string): Observable<User> {
    return this.http.get<User>(UserService.host+'users/'+_id);
  }

}
