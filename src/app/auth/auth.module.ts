import { NgModule } from '@angular/core';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileDeletePageComponent } from './pages/profile-delete-page/profile-delete-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/delete',
    component: ProfileDeletePageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    SignupPageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    ProfileDeletePageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AuthModule {}
