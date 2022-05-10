import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent {
  @Output() showMe = new EventEmitter<boolean>(false);

  @Input() text = '';

  closeMessage() {
    this.showMe.emit(false);
  }
}
