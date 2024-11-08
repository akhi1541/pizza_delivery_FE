import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history-component',
  templateUrl: './order-history-component.component.html',
  styleUrls: ['./order-history-component.component.scss']
})
export class OrderHistoryComponentComponent implements OnInit{
  orderHistory:any;
  private orderService = inject(OrderService)
  ngOnInit(): void {
    const userId = sessionStorage.getItem('uid');
    this.orderService.getOrderHistory(userId as string).subscribe((data:any)=>{
      this.orderHistory = data.data.orderDetails
    })
  }
}
