import { Product } from './../../models/Produtos.modesl';
import { CrudService } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  formProduct: FormGroup;
  // lista!: Observable<Product>;

  constructor(private fb: FormBuilder, public crudService: CrudService ) {
    this.formProduct = fb.group({
      id: [''],
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      preco: ['', Validators.compose([Validators.required])],
      qtde: [Validators.compose([Validators.required, Validators.minLength(0)])],
    });
  }

  ngOnInit(): void { }

  saveProduct() {
    if (this.formProduct.valid) {
      const res = this.crudService.save(this.formProduct.value)
        .then((res) => {
          console.log(res)
          this.formProduct.reset();
        })
        .catch((error) => {
          console.log(error)
      })
    }
  }

  // updateProduct() {
  //   if (this.formProduct.valid) {
  //     this.crudService.update(this.formProduct.value)
  //       .then((res) => {
  //         this.formProduct.reset();
  //       })
  //       .catch((erro) => {
  //       console.log(erro)
  //     })
  //   }
  // }

  edit(produto: Product) {
    this.formProduct.patchValue({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      qtde: produto.qtde
    })
  }

  deleteProduct(id: string) {
    this.crudService.delete(id)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
