import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    AngularFireAuthModule
  ],
  providers: []
})
export class AuthModule { }
