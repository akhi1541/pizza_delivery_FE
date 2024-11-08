import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { PizzaDetailComponentComponent } from './components/pizza-detail-component/pizza-detail-component.component';
import { OrderCartComponentComponent } from './components/order-cart-component/order-cart-component.component';
import { OrderHistoryComponentComponent } from './components/order-history-component/order-history-component.component';
import { RegisterComponentComponent } from './components/register-component/register-component.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: PizzaListComponent, canActivate: [authGuard] },
  {
    path: 'pizza/:id',
    component: PizzaDetailComponentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: OrderCartComponentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    component: OrderHistoryComponentComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
