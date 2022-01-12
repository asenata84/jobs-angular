import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hasUser$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  login$(data: Login): Observable<User> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map((response: User[]) => {
        const user = response.find((u => u.email === data.email && u.password === data.password));

        if (!user) {
          return null;
        }

        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.setHasUser(false);
  }

  hasPermissions(role: string): boolean {
    const loggedUser = this.getLoggedUserFromLocalStorage();

    return loggedUser?.role === role;
  }

  setLoggedUserInLocalStorage(user: User): void {
    delete user?.password;

    localStorage.setItem('loggedUser', JSON.stringify(user));

    this.setHasUser(true);
  }

  getLoggedUserFromLocalStorage(): User {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (loggedUser) {
      this.setHasUser(true);
    }

    return loggedUser;
  }

  getHasUser$(): Observable<boolean> {
    return this.hasUser$.asObservable();
  }

  setHasUser(value: boolean): void {
    this.hasUser$.next(value);
  }

  patchUser$(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/users/${user.id}`, user);
  }

  getUserByEmail$(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users?email=${email}`);
  }
}
