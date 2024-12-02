import { Usuario } from './usuario';
import { Produto } from './cadastro-produto.model';
export interface Promocao {
  id: number;
  Produto: Produto;
  Usuario: Usuario;
  preco: number;
  urlPromocao: string;
  dataInicio: Date;
  dataFim: Date;
}
