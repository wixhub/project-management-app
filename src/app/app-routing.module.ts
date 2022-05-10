import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { ContainerComponent } from './core/components/container/container.component';
import { SignupPageComponent } from './auth/pages/signup-page/signup-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { ProfilePageComponent } from './auth/pages/profile-page/profile-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { StartPageComponent } from './core/pages/start-page/start-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
      {
        path: 'start',
        component: StartPageComponent,
      },
      {
        path: 'main',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainModule),
      },
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
      { path: '**', component: ErrorPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
