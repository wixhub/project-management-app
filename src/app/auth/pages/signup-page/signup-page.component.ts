import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegexValidationService } from '../../services/regex-validation/regex-validation.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  loginForm: FormGroup;

  emailPattern: string;

  lowerUpperCasePattern: string;

  numbersPattern: string;

  specialCharacterPattern: string;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private regexVal: RegexValidationService
  ) {
    this.emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
    this.lowerUpperCasePattern = '(?=.*[a-z])(?=.*[A-Z])';
    this.numbersPattern = '[0-9]+';
    this.specialCharacterPattern = '[!@#?]+';
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      login: new FormControl('', [
        Validators.required,
        regexVal.regexValidator(new RegExp(this.emailPattern), {
          emailError: true,
        }),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        regexVal.regexValidator(new RegExp(this.lowerUpperCasePattern), {
          letterCases: true,
        }),
        regexVal.regexValidator(new RegExp(this.numbersPattern), {
          numbers: true,
        }),
        regexVal.regexValidator(new RegExp(this.specialCharacterPattern), {
          specialCharacter: true,
        }),
      ]),
    });
  }

  authorize(): void {
    this.auth.signup({
      name: this.name?.value,
      login: this.login?.value,
      password: this.password?.value,
    });
    this.router.navigate(['/login']).then();
  }

  get name(): AbstractControl | null {
    return this.loginForm.get('name');
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
