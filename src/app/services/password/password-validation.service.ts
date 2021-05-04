import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class PasswordValidationService {

  constructor() { }

  confimrPasswordValidator = (c1: string, c2: string): ValidatorFn => {
    return (passwordValue: AbstractControl): null | ValidationErrors => {
      if (passwordValue.get(c1)?.value !== passwordValue.get(c2)?.value) {
        passwordValue.get(c2)?.setErrors({ passwordMismatch: true });
        return {
          passwordMismatch: 'Password mismatcgh',
        };
      }

      if (passwordValue.get(c2)?.errors) {
        const { passwordMismatch, ...errors } = passwordValue.get(c2)?.errors || {};
        passwordValue.get(c2)?.setErrors(Object.keys(errors).length === 0 ? null : errors);
      }

      return null;
    };
  }

}
