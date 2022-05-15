import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public boardId!: string;
  private destroy$: Subject<boolean> = new Subject();

  constructor(private title: TitleService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.title.setTitle('Board');
    this.title.setHeaderTitle('BoardPage');
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.boardId = params['id'];
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
