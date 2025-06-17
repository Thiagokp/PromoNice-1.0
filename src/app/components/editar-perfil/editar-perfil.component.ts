import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  editarForm!: FormGroup;
  usuarioId!: number;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const usuario = this.loginService.getUsuarioLogado();

    if (!usuario || !usuario.id) {
      this.toastr.error('Usuário não está logado.', 'Erro');
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioId = usuario.id;

    this.editarForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]], // Senha agora é opcional, com mínimo de 6 caracteres
        confirmarSenha: ['', [Validators.required, Validators.minLength(6)]], // Confirmação de senha também
      },
      { validators: this.passwordMatchValidator } // Validador para garantir que as senhas correspondam
    );

    this.carregarUsuario();
  }

  carregarUsuario(): void {
    this.usuarioService.consultarPorId(this.usuarioId).subscribe(
      (usuario) => {
        this.editarForm.patchValue({
          nome: usuario.nome,
          email: usuario.email,
        });
      },
      (error) => {
        console.error('Erro ao carregar usuário:', error);
        this.toastr.error('Erro ao carregar os dados do usuário.', 'Erro');
      }
    );
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;

    if (senha && confirmarSenha && senha !== confirmarSenha) {
      group.get('confirmarSenha')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    return null;
  }

  atualizarUsuario(): void {
    if (this.editarForm.valid) {
      const { nome, email, senha } = this.editarForm.value;

      // Envia apenas a nova senha
      this.usuarioService
        .alterar(this.usuarioId, {
          nome,
          email,
          senha, // Envia apenas a nova senha
        })
        .subscribe(
          (response) => {
            this.toastr.success('Perfil atualizado com sucesso!', 'Sucesso');
            this.router.navigate(['/perfil']);
          },
          (error) => {
            console.error('Erro ao atualizar o usuário:', error);
            this.toastr.error(
              'Erro ao atualizar o perfil. Verifique se a senha está correta.',
              'Erro'
            );
          }
        );
    } else {
      this.toastr.warning(
        'Por favor, preencha todos os campos corretamente.',
        'Aviso'
      );
    }
  }
}
