import { StoreUser } from './store-user';

export class Order {
    addedByUser: StoreUser;
    customerName: string;
    orderNumber: number;
    coffeeOrder: string[] = [];
    completed: boolean = false;
}