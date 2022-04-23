import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainPageComponent from './main/pages/main-page/main-page.component';
import ErrorPageComponent from './core/pages/error-page/error-page.component';
import ContainerComponent from './core/components/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        component: MainPageComponent,
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
