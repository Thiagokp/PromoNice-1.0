import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http'; // Importando HttpClientModule
import { PaginaInicialComponent } from './pagina-Inicial/pagina-Inicial.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HeaderComponent,
    HttpClientModule, // Adicione o HttpClientModule aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
