import { Component, OnInit } from '@angular/core';

// Definição da interface Product
interface Product {
  image: string;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {
  // Array para armazenar os produtos
  products: Product[] = [];

  // Objeto para armazenar os dados do novo produto
  newProduct: Product = {
    image: '',
    name: '',
    price: 0,
    description: ''
  };

  constructor() { }

  ngOnInit() {
    // Qualquer lógica que você precise ao inicializar o componente
  }

  // Método para adicionar um novo produto
  addProduct(event: Event): void {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Adiciona o novo produto ao array de produtos
    this.products.push({ ...this.newProduct });

    // Limpa o formulário
    this.newProduct = { image: '', name: '', price: 0, description: '' };

    // Aqui você pode adicionar lógica para atualizar a exibição dos produtos, se necessário
  }
}
