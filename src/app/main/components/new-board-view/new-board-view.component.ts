import { DatabaseService } from './../../../api/services/database/database.service';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-board-view',
  templateUrl: './new-board-view.component.html',
  styleUrls: ['./new-board-view.component.scss'],
})
export class NewBoardViewComponent implements OnDestroy {
  @Output() public created = new EventEmitter<any>();
  private destroy$: Subject<boolean> = new Subject();
  public newBoardForm: FormGroup;
  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {
    this.newBoardForm = new FormGroup({
      boardName: new FormControl('', [Validators.required]),
      boardDescription: new FormControl('', [Validators.required]),
    });
  }

  createBoard() {
    const boardName = this.newBoardForm.get('boardName')?.value;
    if (boardName !== '') {
      this.databaseService
        .createBoard(boardName)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.created.emit();
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
