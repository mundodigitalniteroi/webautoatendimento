import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { cep } from './cep.validator';

const CEP_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CEPValidator),
  multi: true,
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cep][ngModel]',
  providers: [CEP_VALIDATOR],
})
export class CEPValidator implements Validator {
  static validate(c: AbstractControl): { [key: string]: any } {
    return cep(c);
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return CEPValidator.validate(c);
  }
}
