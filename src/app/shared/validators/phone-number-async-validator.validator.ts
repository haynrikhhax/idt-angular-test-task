import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';

export function phoneNumberAsyncValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;

    if (!value) {
      return of(null);
    }

    return of(value).pipe(
      debounceTime(500),
      switchMap(() => {
        if (value.length !== 8) {
          return of({ invalidPhoneNumber: true });
        }
        return of(null);
      }),
      catchError(() => of(null))
    );
  };
}
