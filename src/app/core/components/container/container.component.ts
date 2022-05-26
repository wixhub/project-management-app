import { Component, OnInit } from '@angular/core';
import { ShowMessageService } from '../../../api/services/show-message/show-message.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  isModalVisible: boolean = false;

  messageText: string = '';

  constructor(private messageService: ShowMessageService) {}

  ngOnInit(): void {
    this.messageService.messageObservable$.subscribe((message) => {
      this.messageText = message;
      this.isModalVisible = true;
    });
  }
}
