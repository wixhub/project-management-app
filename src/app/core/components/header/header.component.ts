import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TitleService } from '../../services/title.service';
import { AuthenticationService } from '../../../auth/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter();
  private destroy$: Subject<boolean> = new Subject();
  public title = '';
  public currentPageUrl = '';
  public userName = 'userName';
  public isLogged = true;

  constructor(
    private titleService: TitleService,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.currentPageUrl = this.router.url;
  }

  ngOnInit() {
    this.titleService.headerTitle
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.title = value));
    this.router.events.subscribe(
      (path: any) => (this.currentPageUrl = path.url)
    );
    this.auth
      .getLogStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => (this.isLogged = status));
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  public addNewBoard() {}

  public logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
