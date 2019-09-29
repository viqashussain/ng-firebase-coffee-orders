import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OrdersService } from "../../shared/orders.service";
import { Order } from '../../domain/order';
import { AuthService } from 'src/app/shared/auth.service';
import { CoffeeService } from 'src/app/shared/coffee.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  constructor(private ordersService: OrdersService, private authService: AuthService, private coffeeTypesService: CoffeeService) { }

  coffeeTypes$: Observable<any>;
  coffeeOrder: any[] = [];

  ngOnInit() { 
    this.coffeeTypes$ = this.coffeeTypesService.getCoffees().pipe(
      map(x => x.map(x => x.payload.doc as any))
    );
    this.coffeeTypes$.subscribe(x => console.log(x));
  }

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

  addCoffee = coffee => 
  {
    this.coffeeOrder.push(coffee);
  }

  removeCoffee = coffee => {
    let index = this.order.coffeeOrder.indexOf(coffee);
    if (index > -1) this.order.coffeeOrder.splice(index, 1);
  };

  onSubmit() {
    this.order.addedByUser = this.authService.storeUser;
    this.order.coffeeOrder = this.coffeeOrder.map(x => x = x.id);
    this.ordersService.createCoffeeOrder(this.order).then(res => {
      /*do something here....maybe clear the form or give a success message*/
    });
  }
}