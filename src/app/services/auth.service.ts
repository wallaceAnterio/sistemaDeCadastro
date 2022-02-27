import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Login } from '../models/Login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  login(login: Login) {
    return this.angularFireAuth.signInWithEmailAndPassword(login.email, login.senha)
  }

  logout() {
    return this.angularFireAuth.signOut()
  }
}
