import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IBoard } from 'src/app/api/models/APISchemas';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() public item!: IBoard;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClickOpenBoard() {
    this.router.navigate(['main', this.item.id]);
  }
}
