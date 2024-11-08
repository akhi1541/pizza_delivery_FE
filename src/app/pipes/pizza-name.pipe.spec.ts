import { PizzaNamePipe } from './pizza-name.pipe';

describe('PizzaNamePipe', () => {
  it('create an instance', () => {
    const pipe = new PizzaNamePipe();
    expect(pipe).toBeTruthy();
  });
});
