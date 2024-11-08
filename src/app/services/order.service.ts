import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Order } from '../models/order';
import { CartItem, Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // cartItems = new Map<string, Pizza>();
  cartItems: any = [];
  // private cartSubject = new ReplaySubject<Pizza[]>(1);
  private cartSubject = new BehaviorSubject<any>(this.cartItems);
  cart$ = this.cartSubject.asObservable();
  private apiUrl = 'http://localhost:3000/api/v1/orders';
  private cartUrl = 'http://localhost:3000/api/v1/cart'
  private http = inject(HttpClient);



  addToCart(pizza: Pizza): Observable<any> {
    (pizza as any).userId=sessionStorage.getItem('uid');
    return this.http.post(`${this.cartUrl}/addToCart`, pizza);

  }

  getCartItems(): Observable<any> {
    const userId = sessionStorage.getItem('uid')
    return this.http.get(
      `${this.cartUrl}/getCartItems/${userId}`
    );
  }

  removeFromCart(item: any, removeItem: boolean): Observable<any> {
    const userId = sessionStorage.getItem('uid');
    const itemId = item.itemId;
    const pizzaId = item.pizzaId;
    const body = {
      itemId,
      userId,
      pizzaId,
      removeItem,
    };
    return this.http.post<any>(
      `${this.cartUrl}/removeFromCart`,
      body
    );
  }

  updateCart(): void {
    const updatedCart = Array.from(this.cartItems.values());
    this.cartSubject.next(updatedCart);
  }

  getOrderHistory(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  placeOrder(order: any): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}
