import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { TitleService } from '../../services/title.service';

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
    public translate: TranslateService,
    private titleService: TitleService,
    private router: Router
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    this.currentPageUrl = this.router.url;
  }

  ngOnInit() {
    this.titleService.headerTitle
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.title = value));
    this.router.events.subscribe(
      (path: any) => (this.currentPageUrl = path.url)
    );
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  public logout() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
