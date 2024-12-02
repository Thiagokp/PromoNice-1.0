import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CadastroUsuarioComponent implements OnInit {
  mostrarForm: boolean = true;
  cadastroForm!: FormGroup;
  email: string = '';
  senha: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  mudarForms(): void {
    this.mostrarForm = !this.mostrarForm;
  }

  passwordMatchValidator(group: FormGroup): void {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    if (senha !== confirmarSenha) {
      group.get('confirmarSenha')?.setErrors({ mismatch: true });
    }
  }

  salvarUsuario(): void {
    if (this.cadastroForm.valid) {
      const { nome, email, senha } = this.cadastroForm.value;

      // Recuperar o ID do usuário logado
      const id = localStorage.getItem('id');
      if (!id) {
        this.toastr.error('Usuário não autenticado!', 'Erro');
        return;
      }

      // Enviar o ID do usuário junto com os dados do cadastro
      this.usuarioService.salvar({ id, nome, email, senha }).subscribe(
        (response) => {
          this.toastr.success('Usuário salvo com sucesso!', 'Sucesso');
          this.mudarForms();
        },
        (error) => {
          console.error('Erro ao salvar o usuário:', error);
          this.toastr.error('Erro ao salvar o usuário.', 'Erro');
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }

  logar(): void {
    this.loginService.login(this.email, this.senha).subscribe({
      next: (response: any) => {
        localStorage.setItem('id', response.id);
        this.toastr.success('Login bem-sucedido!', 'Sucesso');
        console.log(response.message); // "Login efetuado com sucesso!"
        this.router.navigate(['/cadastro-produto']); // Redireciona para a página de cadastro
      },
      error: (error) => {
        this.toastr.error('Erro ao efetuar o login.', 'Erro');
        console.error('Erro ao tentar fazer login:', error);
      },
    });
  }

  logout(): void {
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }
}
