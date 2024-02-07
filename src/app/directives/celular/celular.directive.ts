import { Directive, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { celular } from './celular.validator';

const CELULAR_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CelularValidator),
  multi: true,
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[celular][ngModel]',
  providers: [CELULAR_VALIDATOR],
})
export class CelularValidator implements Validator {
  static validate(c: AbstractControl): ValidationErrors {
    return celular(c);
  }

  validate(c: AbstractControl): ValidationErrors {
    return CelularValidator.validate(c);
  }
}
