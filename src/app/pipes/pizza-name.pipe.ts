import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pizzaName'
})
export class PizzaNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
