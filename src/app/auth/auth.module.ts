import { NgModule } from '@angular/core';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

@NgModule({
  declarations: [LoginPageComponent, SignupPageComponent],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export default class AuthModule {}
