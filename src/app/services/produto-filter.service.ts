import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProdutoFilterService {


  private termoBuscaSubject = new BehaviorSubject<string>('');
  termoBusca$ = this.termoBuscaSubject.asObservable();

  atualizarTermoBusca(termo: string) {
    this.termoBuscaSubject.next(termo);
  }
}
