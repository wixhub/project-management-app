import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { environment } from '../../../../environments/environment';

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
    this.login?.setValue(environment.login);
    this.password?.setValue(environment.password);
  }

  signin(): void {
    this.auth.login({
      login: this.login?.value,
      password: this.password?.value,
    });
    this.router.navigate(['/main']).then();
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
