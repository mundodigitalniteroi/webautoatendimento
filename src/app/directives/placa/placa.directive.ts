import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { placa } from './placa.validator';

const PLACA_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  /* tslint:disable: no-use-before-declare */
  useExisting: forwardRef(() => PLACAValidator),
  multi: true,
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[placa][ngModel]',
  providers: [PLACA_VALIDATOR],
})
export class PLACAValidator implements Validator {
  static validate(c: AbstractControl): { [key: string]: any } {
    return placa(c);
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return PLACAValidator.validate(c);
  }
}
