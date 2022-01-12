import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  destroy$ = new Subject<boolean>();
  loggedUser: User;
  checkUser: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnUpdate() {
    this.loggedUser = this.authService.getLoggedUserFromLocalStorage();
  }

  ngOnInit(): void {
    this.buildForm();
    this.loggedUser = this.authService.getLoggedUserFromLocalStorage();
    this.buildForm(this.loggedUser);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const user = this.formGroup.value as User;

    this.authService.getUserByEmail$(user?.email).subscribe({
      next: (response: User[]) => {
        if (response?.length === 0 || response[0]?.id?.toString() === user?.id?.toString()) {
          this.authService.patchUser$(user).subscribe({
            next: (response: User) => {
              this.authService.setLoggedUserInLocalStorage(response);
              this.router.navigate(['/main', 'jobs']);
            }
          });
        } else {
          alert('User with this email already exists!');
        }
      }
    })
  }

  private buildForm(user?: User): void {
    this.formGroup = this.fb.group({
      id: user?.id,
      name: [user?.name || '', [Validators.required]],
      email: [user?.email || '', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onDestroyAccount(): void {
    this.authService.deleteUser$(this.loggedUser?.id).subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/auth', 'login']);
      }
    });
  }
}
