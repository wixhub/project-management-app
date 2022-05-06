import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ShowMessageService } from '../../../api/services/show-message/show-message.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent {
  @Output() showMe = new EventEmitter<boolean>(false);

  @Input() text = '';

  constructor() {
    console.log('init modal');
  }

  closeMessage() {
    this.showMe.emit(false);
  }
}
