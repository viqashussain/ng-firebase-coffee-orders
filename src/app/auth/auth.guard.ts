import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    if (this.authService.isLoggedIn) {
      return of(true)
    }
    else {
      this.router.navigate(['auth/login'])
    }
  }
}