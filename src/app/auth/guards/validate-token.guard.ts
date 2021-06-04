import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    console.log('canActive');
    return this.authService.validateToken()
        .pipe(
          tap( valid => {
            if( !valid ) {// The token is invalid
              this.router.navigateByUrl('/auth');
            }
          })
        );
  }
  
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    return this.authService.validateToken()
        .pipe(
          tap( valid => {
            if( !valid ) {// The token is invalid
              this.router.navigateByUrl('/auth');
            }
          })
        );
  }

}
