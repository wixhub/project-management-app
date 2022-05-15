import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { NewBoardViewComponent } from './components/new-board-view/new-board-view.component';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { NewBoardPageComponent } from './pages/new-board-page/new-board-page.component';
import { CreateColumnDialogComponent } from './components/create-column-dialog/create-column-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    component: NewBoardPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: BoardPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    MainPageComponent,
    BoardViewComponent,
    BoardPageComponent,
    NewBoardViewComponent,
    BoardItemComponent,
    BoardColumnComponent,
    BoardCardComponent,
    NewBoardPageComponent,
    CreateColumnDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MainModule {}
