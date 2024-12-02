import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Produto } from '../../models/cadastro-produto.model';
import { ProdutoService } from '../../services/produto.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Promocao } from '../../models/promocao';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css',
})
export class CadastroProdutoComponent implements OnInit {
  // Ícones de like e dislike
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  isClicked: boolean = false;

  usuario: Usuario | undefined;
  produto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    urlProduto: '',
    promocoes: [
      // Inicializando um array de promoções
      {
        id: 0,
        Produto: {} as Produto,
        Usuario: {} as Usuario,
        preco: 0,
        urlPromocao: '',
        dataInicio: new Date(),
        dataFim: new Date(),
      },
    ],
  };

  constructor(
    private produtoService: ProdutoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router:  Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'] || localStorage.getItem('id'); // Recupera o ID do localStorage caso não esteja na URL
      if (id) {
        this.getUsuarioLogado(Number(id));
      } else {
        this.toastr.error('Usuário não autenticado!', 'Erro');
      }
    });
  }

  getUsuarioLogado(id: number) {
    this.usuarioService.consultarPorId(id).subscribe({
      next: (res) => {
        console.log('Usuário logado:', res);
        this.usuario = res; // Atualiza o usuário logado
      },
      error: (err) => {
        console.error('Erro ao obter usuário:', err);
      },
    });
  }

  cadastrarProduto() {
    if (!this.isFormValid()) {
      this.isClicked = true;
      this.toastr.error('Preencha todos os campos corretamente.', 'Erro');
      return;
    }

    if (this.usuario) {
      this.produto.promocoes[0].Usuario = this.usuario; // Associa o usuário logado à promoção

      this.produtoService
        .cadastrarProduto(this.usuario.id, this.produto)
        .subscribe({
          next: (res) => {
            console.log(this.produto);
            console.log('Produto cadastrado com sucesso:', res);
            this.produto.id = res.id;
            this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso');
            this.router.navigate(['/home']);
            this.resetForm();
            this.loadProduto();
          },
          error: (err) => {
            console.error('Erro ao cadastrar produto:', err);
            this.toastr.error(
              'Erro ao cadastrar produto. Tente novamente.',
              'Erro'
            );
          },
        });
    }
  }

  isFormValid(): boolean {
    return (
      this.produto.nome.trim() !== '' &&
      this.produto.descricao.trim() !== '' &&
      this.produto.urlProduto.trim() !== '' &&
      this.produto.promocoes[0].urlPromocao.trim() !== '' &&
      this.produto.promocoes[0].preco > 0
    );
  }

  resetForm() {
    this.produto = {
      id: 0,
      nome: '',
      descricao: '',
      urlProduto: '',
      promocoes: [
        // Inicializando um array de promoções
        {
          id: 0,
          Produto: {} as Produto,
          Usuario: {} as Usuario,
          preco: 0,
          urlPromocao: '',
          dataInicio: new Date(),
          dataFim: new Date(),
        },
      ],
    };
    this.isClicked = false;
  }

  loadProduto() {
    if (this.produto.id && this.produto.id > 0) {
      this.produtoService.consultarProdutoPorId(this.produto.id).subscribe({
        next: (produto) => {
          console.log('Produto carregado:', produto);
          this.produto = produto; // Atualiza o produto com promoções
        },
        error: (err) => {
          console.error('Erro ao carregar produto:', err);
          this.toastr.error(
            'Erro ao carregar produto. Tente novamente.',
            'Erro'
          );
        },
      });
    } else {
      console.warn('ID do produto inválido. Não foi possível carregar.');
    }
  }

  // Método para redirecionar para o link da promoção
  openPromotionLink(link: string): void {
    window.open(link, '_blank');
  }
}
