import { FormControl, ValidatorFn } from '@angular/forms';

export function title(): ValidatorFn {
  return (control: FormControl): { [key: string]: any } | null => {
    if (!control || !control.value) {
      return null;
    }

    const regexPattern = /\d/;
    if (regexPattern.test(control.value)) {
      return null;
    }

    return { patternTitle: true };
  };
}
