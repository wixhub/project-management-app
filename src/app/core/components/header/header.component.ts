import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../auth/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();
  public userName = 'userName';
  public isLogged = true;
  public isMain = true;

  constructor(
    public translate: TranslateService,
    private auth: AuthenticationService
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  public logout() {
    this.auth.logout();
  }
}
