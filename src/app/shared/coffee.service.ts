import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  coffeesRef: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.coffeesRef = this.firestore.collection("coffeeTypes");
  }

  getCoffees(): Observable<any> {
    return this.coffeesRef.snapshotChanges();
  }
}
 