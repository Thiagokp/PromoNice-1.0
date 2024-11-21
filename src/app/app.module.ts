import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from "./components/header/header.component";
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { RouterModule } from '@angular/router';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { ModalConfiguracaoComponent } from './components/header/modal-configuracao/modal-configuracao.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroUsuarioComponent,
    CadastroProdutoComponent,
    ModalConfiguracaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HeaderComponent,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // Adicionado para animações
    ToastrModule.forRoot({
      timeOut: 3000,            // Duração da mensagem em milissegundos
      positionClass: 'toast-top-right', // Posição no canto superior direito
      preventDuplicates: true,  // Evita mensagens duplicadas
      progressBar: true,        // Exibe a barra de progresso
      closeButton: true,        // Exibe botão de fechar
      tapToDismiss: true        // Fecha ao clicar na mensagem
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
