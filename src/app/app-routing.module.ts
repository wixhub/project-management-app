import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { ContainerComponent } from './core/components/container/container.component';
import { StartPageComponent } from './core/pages/start-page/start-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'start',
        component: StartPageComponent,
      },
      {
        path: 'main',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainModule),
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
