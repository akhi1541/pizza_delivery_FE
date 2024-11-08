import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { PizzaDetailComponentComponent } from './components/pizza-detail-component/pizza-detail-component.component';
import { OrderCartComponentComponent } from './components/order-cart-component/order-cart-component.component';
import { OrderHistoryComponentComponent } from './components/order-history-component/order-history-component.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { RegisterComponentComponent } from './components/register-component/register-component.component';
import { PizzaNamePipe } from './pipes/pizza-name.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PizzaListComponent,
    PizzaDetailComponentComponent,
    OrderCartComponentComponent,
    OrderHistoryComponentComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    PizzaNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
