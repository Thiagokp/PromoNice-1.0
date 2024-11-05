import { Component, OnInit } from '@angular/core';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Product } from './shared/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Ícones de like e dislike
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  // Array para armazenar os produtos
  products: Product[] = [];

  // Objeto para armazenar os dados do novo produto
  newProduct: {
    image: string;
    name: string;
    price: string; // Aqui mantemos como string para a máscara
    description: string;
    promotionLink: string;
  } = {
    image: '',
    name: '',
    price: '', // Mantemos como string para aplicar a máscara
    description: '',
    promotionLink: '' // Inicializa o novo campo
  };

  constructor() { }

  ngOnInit() {
    // Qualquer lógica que você precise ao inicializar o componente
  }

  // Método para adicionar um novo produto
  addProduct(event: Event): void {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    if (this.isFormValid()) {
      // Converte o preço de string para número, removendo os caracteres não numéricos
      const parsedPrice = parseFloat(this.newProduct.price.replace(/[^0-9,-]+/g, '').replace(',', '.'));

      // Adiciona o novo produto ao array de produtos
      this.products.push({
        image: this.newProduct.image,
        name: this.newProduct.name,
        price: parsedPrice, // Armazena como número
        description: this.newProduct.description,
        promotionLink: this.newProduct.promotionLink // Adiciona o link da promoção
      });

      // Limpa o formulário
      this.newProduct = { image: '', name: '', price: '', description: '', promotionLink: '' };
    }
  }

  // Verifica se o formulário está preenchido
  isFormValid(): boolean {
    return this.newProduct.image.trim() !== '' &&
           this.newProduct.name.trim() !== '' &&
           this.newProduct.price.trim() !== '' &&
           parseFloat(this.newProduct.price.replace(/[^0-9,-]+/g, '').replace(',', '.')) > 0 &&
           this.newProduct.description.trim() !== '' &&
           this.newProduct.promotionLink.trim() !== ''; // Valida o link da promoção
  }

  // Método para redirecionar para o link da promoção
  openPromotionLink(link: string): void {
    window.open(link, '_blank');
  }
}
