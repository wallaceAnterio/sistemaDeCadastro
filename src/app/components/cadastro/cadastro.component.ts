import { CrudService } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  formProduct: FormGroup;

  constructor(private fb: FormBuilder, private crudService: CrudService ) {
    this.formProduct = fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      preco: ['', Validators.compose([Validators.required])],
      qtde: [1, Validators.compose([Validators.required, Validators.minLength(0)])],
    });
  }

  ngOnInit(): void { }

  saveProduct() {
    if (this.formProduct.valid) {
      const res = this.crudService.create(this.formProduct.value)
      return console.log(res)
    }
  }
}
