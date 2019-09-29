import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeOrdersRoutingModule } from './coffee-orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { OrderListComponent } from './order-list/order-list.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatButtonModule, MatTableModule } from '@angular/material';
import { CoffeeTypesComponent } from './coffee-types/coffee-types.component';

@NgModule({
  declarations: [OrdersComponent, OrderListComponent, HomeComponent, CoffeeTypesComponent],
  imports: [
    CommonModule,
    CoffeeOrdersRoutingModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class CoffeeOrdersModule { }
