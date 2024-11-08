import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from 'src/app/models/pizza';
import { OrderService } from 'src/app/services/order.service';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-detail-component',
  templateUrl: './pizza-detail-component.component.html',
  styleUrls: ['./pizza-detail-component.component.scss'],
})
export class PizzaDetailComponentComponent implements OnInit {
  private pizzaService = inject(PizzaService);
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  pizza!: Pizza;
  quantity: number = 0;
  showQuantityControls = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pizzaService.getPizzaById(id).subscribe({
        next: (response: any) => {
          this.pizza = response.data.pizza;
          const savedQuantity = localStorage.getItem(
            `cart_${this.pizza.pizzaId}`
          );
          if (savedQuantity) {
            this.quantity = JSON.parse(savedQuantity);
            this.showQuantityControls = true;
          }
        },
        error: (err) => {
          console.error('Error fetching pizza:', err);
        },
      });
    } else {
      console.error('No pizza ID found in route');
    }
  }

  updateCart(pizza: Pizza): void {
    this.orderService.addToCart(pizza).subscribe((response) => {
      this.quantity = response.data.Qty;
      this.showQuantityControls = true;
      localStorage.setItem(
        `cart_${pizza.pizzaId}`,
        JSON.stringify(this.quantity)
      );
    });
  }

  decreaseQuantity(pizza: Pizza): void {
    this.orderService.removeFromCart(pizza, false).subscribe((response) => {
      this.quantity = response.quantity;
      if (this.quantity <= 0) {
        this.showQuantityControls = false;
        localStorage.removeItem(`cart_${pizza.pizzaId}`);
      } else {
        localStorage.setItem(
          `cart_${pizza.pizzaId}`,
          JSON.stringify(response.quantity)
        );
      }
    });
  }
}
