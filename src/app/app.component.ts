import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Evento } from './models/evento';
import { MateriaEnum } from './models/enums/materia-enum';
import { TipoEvento } from './models/enums/tipo-evento';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  EVENTOS: Array<Evento> = [];

  constructor(private apiService: ApiService) { 
    //this.buscarEventos();
    this.inserir();
  }

  async buscarEventos(): Promise<Array<Evento>> {
    this.EVENTOS = await this.apiService.get();
    return this.EVENTOS;
  }

  inserir() {
    let evento: Evento = new Evento();
    evento.Id = 1;
    evento.Nome = "Geometria Analítica";
    evento.Materia = MateriaEnum.MAT;
    evento.Entrega = new Date();
    evento.Tipo = TipoEvento.Prova;
    evento.Descricao = "jaoisdjisajdijsaodjsaijdisajdiaisdijjsaidisadijsai josaoid oisad";

    let evento1: Evento = new Evento();
    evento1.Id = 30;
    evento1.Nome = "Plano de testes";
    evento1.Materia = MateriaEnum.QTS;
    evento1.Entrega = new Date();
    evento1.Entrega.setDate(new Date().getDate() + 2);
    evento1.Tipo = TipoEvento.Atividade;
    this.EVENTOS.push(evento);
    this.EVENTOS.push(evento1);
  }
}