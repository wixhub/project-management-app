import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    StartPageComponent,
    ErrorPageComponent,
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    SidenavListComponent,
    LanguageSwitcherComponent,
    MessageModalComponent,
    ConfirmDialogComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule, HeaderComponent],
})
export class CoreModule {}
