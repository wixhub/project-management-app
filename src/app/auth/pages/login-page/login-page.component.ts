import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private auth: AuthenticationService) {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  signin(): void {
    const subs = this.auth
      .login({
        login: this.login?.value,
        password: this.password?.value,
      })
      .subscribe(() => {
        this.router.navigate(['/main']).then();
        subs.unsubscribe();
      });
  }

  get login(): AbstractControl | null {
    return this.loginForm.get('login');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  haveValidationErrors(): boolean {
    return !(this.login?.errors === null && this.password?.errors === null);
  }
}
