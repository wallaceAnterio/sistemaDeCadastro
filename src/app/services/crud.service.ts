import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

import { Product } from '../models/Produtos.modesl';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudService {

  public lista: any;
  user_id: any;

  constructor(private angularFireDatabase: AngularFirestore, private afa: AngularFireAuth) {
    // verifica qual usuario está logado
    afa.authState.subscribe((user) => {
      if (user?.uid) { // se tiver usuario logado
        this.user_id = user?.uid;
        console.log(this.user_id);
        this.list(this.user_id);
      }
      else {
        this.user_id = '';
      }
    })
  }

  save(produto: Product) {
    produto.id == '' ? produto.user_create = this.user_id : produto.user_edit = this.user_id
    produto.id == '' ? produto.id = this.angularFireDatabase.createId() : produto.id = produto.id
    return this.angularFireDatabase.collection('Produtos').doc(produto.id).set(produto, {merge: true})
  }

  // update(produto: Product) {
  //   produto.id = this.angularFireDatabase.createId();
  //   return this.angularFireDatabase.collection('Produtos').doc(produto.id).set(produto, {merge: true})
  // }

  //listando os produtos do usuario logado
  list(idUser: string) {
    // lista apenas o usuario atual
    // this.lista = this.angularFireDatabase.collection('Produtos', ref => {
    //    return ref.where('user_create', '==', idUser)
    //  }).valueChanges();

    // lista todos os items, independente do usuario logado
    this.lista = this.angularFireDatabase.collection('Produtos').valueChanges();
  }
  listById() { }

  delete(id: string) {
    return this.angularFireDatabase.collection('Produtos').doc(id).delete()
  }
}
