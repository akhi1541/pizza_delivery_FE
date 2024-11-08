export interface PizzaItem {
  id: string;
  pizzaId: string; 
  quantity: number;
}


export interface Order {
    orderId: string; 
    userId: string; 
    pizzaItems: PizzaItem[]; 
    totalPrice: number; 
    deliveryAddress: string;
    status?: 'pending' | 'delivered'; 
  }