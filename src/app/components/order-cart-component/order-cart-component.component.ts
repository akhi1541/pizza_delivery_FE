import { Component, OnInit } from '@angular/core';
import { CartItem, Pizza } from 'src/app/models/pizza';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-cart-component',
  templateUrl: './order-cart-component.component.html',
  styleUrls: ['./order-cart-component.component.scss'],
})
export class OrderCartComponentComponent implements OnInit {
  cartItems: CartItem[] = [];
  data: any = [];
  error: string | null = null;
  totalPrice: any;
  quantity: any;
  showQuantityControls: any;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {

    this.orderService.getCartItems().subscribe((response) => {
      this.cartItems = response.data;
      
      
      this.totalPrice = this.cartItems.reduce((total: any, item) => {
        return (total = total + item.Qty * item.pizzaDetails.price);
      }, 0);
    });

    this.orderService.cart$.subscribe({
      next: (items) => {
        this.cartItems = items;
      },
      error: (err) => {
        console.error('Failed to load cart items:', err);
        this.error = 'Failed to load cart items. Please try again later.';
      },
    });
  }
  

  removePizza(item: any): void {
    const removeItem = true;
    this.totalPrice = this.totalPrice - item.Qty * item.pizzaDetails.price;
    if (localStorage.getItem(`cart_${item.pizzaId}`))
      localStorage.removeItem(`cart_${item.pizzaId}`);

    this.cartItems = this.cartItems.filter((id: any) => id._id != item._id);
    if (this.cartItems.length === 0) this.totalPrice = 0;
    this.orderService
      .removeFromCart(item, removeItem)
      .subscribe((response) => (this.quantity = response.data.Qty));
  }

  updateCart(pizza: any): void {
    this.orderService.addToCart(pizza).subscribe((response) => {

      const index = this.cartItems.findIndex(
        (item: any) => item.pizzaId === pizza.pizzaId
      );
      if (index !== -1) {
        this.cartItems[index].Qty = response.data.Qty; 
        localStorage.setItem(
          `cart_${pizza.pizzaId}`,
          JSON.stringify(this.cartItems[index].Qty)
        );
      }
    });
  }

  decreaseQuantity(pizza: any): void {
    this.orderService.removeFromCart(pizza, false).subscribe((response) => {
      const index = this.cartItems.findIndex(
        (item: any) => item.pizzaId === pizza.pizzaId
      );
      if (index !== -1) {
        this.cartItems[index].Qty = response.quantity; 
        if (this.cartItems[index].Qty <= 0) {
          
          this.cartItems.splice(index, 1);
          localStorage.removeItem(`cart_${pizza.pizzaId}`);
        } else {
          localStorage.setItem(
            `cart_${pizza.pizzaId}`,
            JSON.stringify(this.cartItems[index].Qty)
          );
        }
      }
    });
  }

  checkout(): any {
    const checkoutItems = this.cartItems.map((e: any) => ({
      pizzaId: e.pizzaDetails._id,
      quantity: e.Qty,
    }));
    const orderObj = {
      userId: sessionStorage.getItem('uid'),
      pizzaItems: checkoutItems,
      totalPrice: this.totalPrice,
      deliveryAddress: sessionStorage.getItem('address'),
    };
    this.orderService.placeOrder(orderObj).subscribe({
      next: (data: any) => {
        this.cartItems.length = 0;
      },
      error: (error) => {
        console.error('Order failed:', error);
      },
    });
  }
}
