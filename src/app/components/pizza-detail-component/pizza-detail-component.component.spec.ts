import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaDetailComponentComponent } from './pizza-detail-component.component';

describe('PizzaDetailComponentComponent', () => {
  let component: PizzaDetailComponentComponent;
  let fixture: ComponentFixture<PizzaDetailComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaDetailComponentComponent]
    });
    fixture = TestBed.createComponent(PizzaDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
