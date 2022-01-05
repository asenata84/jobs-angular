import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    AuthComponent
  ]
})
export class AuthModule {
}
