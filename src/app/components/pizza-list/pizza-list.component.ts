import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pizza } from 'src/app/models/pizza';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
})
export class PizzaListComponent implements OnInit {
  pizzas: Pizza[] = [];
  path: string = '../../../assets/';

  constructor(
    private pizzaService: PizzaService,
    private router:Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.pizzaService.getPizzas().subscribe((data: any) => {
      this.pizzas = data.data.pizzas;
    });
  }
  logout(){
    this.authService.logout()
  }
}
