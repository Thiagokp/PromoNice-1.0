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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Adicione isso
import { ToastrModule } from 'ngx-toastr'; // Importação do Toastr


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
    ToastrModule.forRoot() // Inicialização correta do módulo Toastr
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
