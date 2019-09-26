import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OrdersService } from "../../shared/orders.service";
import { Order } from '../../domain/order';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  constructor(private ordersService: OrdersService, private authService: AuthService) { }

  ngOnInit() { }

  order: Order = new Order();

  coffees = [
    "Americano",
    "Flat White",
    "Cappuccino",
    "Latte",
    "Espresso",
    "Machiato",
    "Mocha",
    "Hot Chocolate",
    "Tea"
  ];

  addCoffee = coffee => this.order.coffeeOrder.push(coffee);

  removeCoffee = coffee => {
    let index = this.order.coffeeOrder.indexOf(coffee);
    if (index > -1) this.order.coffeeOrder.splice(index, 1);
  };

  onSubmit() {
    this.order.addedByUser = this.authService.storeUser;
    this.ordersService.createCoffeeOrder(this.order).then(res => {
      /*do something here....maybe clear the form or give a success message*/
    });
  }
}