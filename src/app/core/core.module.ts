import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import StartPageComponent from './pages/start-page/start-page.component';
import ErrorPageComponent from './pages/error-page/error-page.component';
import ContainerComponent from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [StartPageComponent, ErrorPageComponent, ContainerComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule],
})
export default class CoreModule {}
