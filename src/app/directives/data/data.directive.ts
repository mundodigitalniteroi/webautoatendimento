import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { data } from './data.validator';

const DATA_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => DataValidator),
  multi: true,
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[data][ngModel]',
  providers: [DATA_VALIDATOR],
})
export class DataValidator implements Validator {
  static validate(c: AbstractControl): { [key: string]: any } {
    return data(c);
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return DataValidator.validate(c);
  }
}
