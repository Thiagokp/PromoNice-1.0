import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/Header.component';
import { PaginaInicialComponent } from './Pagina-Inicial/Pagina-Inicial.component';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule aqui


@NgModule({
  declarations: [
    AppComponent,
      PaginaInicialComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    FormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
