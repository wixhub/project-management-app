import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TitleService } from '../../../core/services/title.service';

@Component({
  selector: 'app-profile-delete-page',
  templateUrl: './profile-delete-page.component.html',
  styleUrls: ['./profile-delete-page.component.scss'],
})
export class ProfileDeletePageComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private title: TitleService
  ) {}

  public deleteUser() {
    this.auth.delete(this.auth.userId);
    this.auth.logout();
  }

  ngOnInit(): void {
    this.title.setTitle('Delete profile');
    this.title.setHeaderTitle('Delete-profile');
  }
}
