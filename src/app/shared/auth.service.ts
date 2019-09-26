import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { RegistrationModel } from '../domain/models/registration-model';
import { StoreUser } from '../domain/store-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  storeUser: StoreUser;
  usersRef: AngularFirestoreCollection;

  constructor(public afAuth: AngularFireAuth, public router: Router, private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })

    this.usersRef = this.firestore.collection("users");
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((res: firebase.auth.UserCredential) => {
        return new Promise<any>((resolve, reject) => {

          this.usersRef.doc(res.user.uid).ref.get()
            .then(res => {
              this.storeUser = res.data() as StoreUser;
              this.router.navigate(['coffee-orders'])
            }, err => reject(err))

        });
      });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(res => {
        localStorage.removeItem('user')
        this.router.navigate(['auth/login'])
      }, err => alert('Error! ' + err.message));
  }

  register(model: RegistrationModel) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(model.email, model.password)
        .then((res: firebase.auth.UserCredential) => {

          const storeUser: StoreUser = new StoreUser();
          storeUser.email = model.email;
          storeUser.forename = model.forename;
          storeUser.surname = model.surname;
          storeUser.uid = res.user.uid;

          this.usersRef
            .doc(res.user.uid)
            .set({ ...storeUser })
            .then(res => {
              this.router.navigate(['auth/login']);
            }, err => reject(err));

        }, err => alert('Error! ' + err.message))
    })
  }

  createUser() {

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}

export class EmailPasswordCredentials {
  email: string;
  password: string;
}
