import { NgModule } from '@angular/core';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [SignupPageComponent, SignupPageComponent, LoginPageComponent],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatFormFieldModule],
})
export default class AuthModule {}
