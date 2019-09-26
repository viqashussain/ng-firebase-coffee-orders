import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../../shared/orders.service";
import { Order } from 'src/app/domain/order';

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"]
})
export class OrderListComponent implements OnInit {
  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.getCoffeeOrders();
  }

  coffeeOrders: any[];
  displayedColumns: string[] = ['addedByUser', 'orderNumber', 'customerName', 'coffeeOrders', 'complete', 'remove'];

  getCoffeeOrders = () =>
    this.ordersService
      .getCoffeeOrders()
      .subscribe(res => {
        (this.coffeeOrders = res.map(x => x.payload.doc as any))
      });

  deleteOrder = data => this.ordersService.deleteCoffeeOrder(data.id);

  markCompleted = data => this.ordersService.updateCoffeeOrder(data.id);
}
