import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Order } from '../domain/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class OrdersService {
  coffeeOrderRef: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.coffeeOrderRef = this.firestore.collection("coffeeOrders");
  }

  createCoffeeOrder(data: Order) {
    return new Promise<any>((resolve, reject) => {
      this.coffeeOrderRef
        .add({...data})
        .then(res => {}, err => reject(err));
    });
  }

  updateCoffeeOrder(orderId: string) {
    return this.coffeeOrderRef
      .doc(orderId)
      .set({ completed: true }, { merge: true });
  }

  getCoffeeOrders(): Observable<any> {
    return this.coffeeOrderRef.snapshotChanges();
  }

  deleteCoffeeOrder(orderId: string) {
    return this.coffeeOrderRef
      .doc(orderId)
      .delete();
  }
}
