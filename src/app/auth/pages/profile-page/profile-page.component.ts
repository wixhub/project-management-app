import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { RegexValidationService } from '../../services/regex-validation/regex-validation.service';
import { TitleService } from '../../../core/services/title.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  loginForm: FormGroup;

  emailPattern: string;

  lowerUpperCasePattern: string;

  numbersPattern: string;

  specialCharacterPattern: string;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private regexVal: RegexValidationService,
    private title: TitleService
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
    const subs = this.auth.userName$.subscribe((name) => {
      this.name?.setValue(name);
      subs.unsubscribe();
    });
    this.login?.setValue(this.auth.userLogin);
  }

  ngOnInit(): void {
    this.title.setTitle('Profile');
    this.title.setHeaderTitle('Profile');
  }

  update(): void {
    this.auth.update(this.auth.userId, {
      name: this.name?.value,
      login: this.login?.value,
      password: this.password?.value,
    });
    this.router.navigate(['/auth/login']).then();
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
