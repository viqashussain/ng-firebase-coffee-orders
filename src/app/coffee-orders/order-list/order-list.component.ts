import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrdersService } from "../../shared/orders.service";
import { Order } from 'src/app/domain/order';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"]
})
export class OrderListComponent implements OnInit, OnDestroy {
  
  constructor(private ordersService: OrdersService) { }

  coffeeOrders$: Observable<any>;
  componentDestroyed$: Subject<any> = new Subject();
  displayedColumns: string[] = ['addedByUser', 'orderNumber', 'customerName', 'coffeeOrders', 'complete', 'remove'];

  ngOnInit() {
    this.coffeeOrders$ = this.ordersService.getCoffeeOrders().pipe(
      map(x => x.map(x => x.payload.doc as any)),
      takeUntil(this.componentDestroyed$)
    );
  }

  deleteOrder = data => this.ordersService.deleteCoffeeOrder(data.id);

  markCompleted = data => this.ordersService.updateCoffeeOrder(data.id);

  ngOnDestroy()
  {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
