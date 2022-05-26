import { Injectable } from '@angular/core';
import { ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegexValidationService {
  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control => {
      if (!control.value) {
        return null;
      }
      return regex.test(control.value) ? null : error;
    });
  }
}
