import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    value = value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.slice(0, 2) + ' ' + value.slice(2, 8);
    }

    return value;
  }
}
