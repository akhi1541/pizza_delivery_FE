import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCartComponentComponent } from './order-cart-component.component';

describe('OrderCartComponentComponent', () => {
  let component: OrderCartComponentComponent;
  let fixture: ComponentFixture<OrderCartComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCartComponentComponent]
    });
    fixture = TestBed.createComponent(OrderCartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
