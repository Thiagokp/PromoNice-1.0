import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {}

  canActivate(): boolean {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      return true;
    } else {
      this.router.navigate(['/home']);
      this.toastr.error('Usuário não logado!', 'Erro');
      return false;
    }
  }
}
