import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canLoad(route: Route): boolean {
    const loggedUser = this.authService.getLoggedUserFromLocalStorage();

    if (!loggedUser) {
      this.router.navigate(['/auth', 'login']);

      return false;
    }

    return true;
  }
}
