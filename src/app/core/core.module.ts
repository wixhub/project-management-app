import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import StartPageComponent from './pages/start-page/start-page.component';
import ErrorPageComponent from './pages/error-page/error-page.component';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    StartPageComponent,
    ErrorPageComponent,
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    SidenavListComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule, HeaderComponent],
})
export class CoreModule {}
