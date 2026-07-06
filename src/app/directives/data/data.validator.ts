import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { utilsBr, validateBr } from 'js-brasil';
import * as moment from 'moment';

export const data: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }

  const v: string = control.value;
  if (validateBr.data(v)) {
    if (v.length == 10) {
      const date = moment(v, 'DD/MM/YYYY');
      const now = moment().startOf('day');
      const diff = date.diff(now, 'years');
      return diff > -18 ? { data: true } : null;
    }
  }

  return { data: true };
};
