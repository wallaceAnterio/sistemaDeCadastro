import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/Produtos.modesl';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private angularFireDatabase: AngularFirestore) {}

  create(produto: Product) {
    produto.id = this.angularFireDatabase.createId();
    this.angularFireDatabase.collection('Produtos').doc(produto.id).set(produto)
      .then((res) => {
       console.log(res)
      })
      .catch((error) => {
      console.log(error)
    })
  }
  update() {}
  list() {}
  listById() {}
  delete() {}
}
