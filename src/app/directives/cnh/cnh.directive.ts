import { Directive, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { cnh } from './cnh.validator';

const CNH_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CnhValidator),
  multi: true,
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cnh][ngModel]',
  providers: [CNH_VALIDATOR],
})
export class CnhValidator implements Validator {
  static validate(c: AbstractControl): { [key: string]: any } {
    return cnh(c);
  }

  validate(control: AbstractControl): ValidationErrors {
    return CnhValidator.validate(control);
  }
}
