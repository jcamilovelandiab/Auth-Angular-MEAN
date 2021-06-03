import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.apiBaseUrl;
  private _user!: User;

  constructor( private httpClient: HttpClient ) { }

  get user() {
    return { ...this._user };
  }

  login( email: string, password: string ) {
    const url  = `${ this.baseUrl }/auth`;
    const body = { email, password };
    return this.httpClient.post<AuthResponse>( url, body )
        .pipe(
          tap( resp => {
            if( resp.ok ) {
              this._user = {
                name: resp.name!,
                uid: resp.uid!
              };
            }
          }),
          map( response => response .ok ),
          catchError( err => of(err.error.msg) )
        );
  }

}
