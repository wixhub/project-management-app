import { Component, Input, OnInit } from '@angular/core';
import { ISearchResults } from '../../services/search-service/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
})
export class ResultItemComponent implements OnInit {
  @Input() result: ISearchResults = {
    boardId: '',
    boardName: '',
    columnName: '',
    taskName: '',
    taskDesc: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTo() {
    this.router.navigate(['/main']).then(() => {
      this.router.navigate([`/main/${this.result.boardId}`]).then();
    });
  }
}
