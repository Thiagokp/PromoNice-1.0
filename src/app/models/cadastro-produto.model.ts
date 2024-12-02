import { Promocao } from './promocao';
export interface Produto {

  id: number;
  nome: string;
  descricao: string;
  urlProduto: string;
  promocoes: Promocao[];
}
