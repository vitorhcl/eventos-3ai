import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Evento, EventoComponent, MateriaEnum, TipoEvento } from '../evento/evento.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  title = 'Eventos 3AI';
  @Input() EVENTOS: Array<Evento> = new Array<Evento>();
  eventosDisplay: Array<Evento> = new Array<Evento>();
  filtro: string | null = null;
  descricaoAtividadeAtual: string | null = null;

  constructor() {
  }

  ngOnInit() {
    console.log('Eventos main: ');
    console.log(this.EVENTOS);
    this.eventosDisplay = this.EVENTOS;
    this.eventosDisplayOrdenar();
  }

  eventosDisplayOrdenar() {
    this.eventosDisplay.sort((a, b) => a.Entrega === undefined ? -1 : (a.Entrega! < b.Entrega! ? -1 : 1));
  }

  copiarTexto = (texto: string) => {
    navigator.clipboard.writeText(texto);
  }

  copiarEventosVisiveis() {
    let texto: string = "";
    this.eventosDisplay.forEach(e => {
      texto += e.ToString() + "\n";
    });
    this.copiarTexto(texto);
  }

  removerFiltro() {
    this.filtro = null;
    this.eventosDisplay = this.EVENTOS;
    this.eventosDisplayOrdenar();
    this.descricaoAtividadeAtual = null;
  }

  exibirAtividade(id: number) {
    let evento: Evento | undefined = this.EVENTOS.find(e => e.Id == id);
    if(evento == undefined) {
      this.removerFiltro();
    }
    else {
      if(evento?.Descricao == null)
        this.descricaoAtividadeAtual = "Sem descrição";
      else
        this.descricaoAtividadeAtual = evento?.Descricao;
      this.eventosDisplay = [evento];
      this.eventosDisplayOrdenar();
      this.filtro = `Ocultar descrição (${evento?.Base36ID})`;
    }
  }

  filtrarPorData(data: Date) {
    this.eventosDisplay = this.EVENTOS.filter(e => e.Entrega == data);
    this.eventosDisplayOrdenar();
    this.filtro = `Remover filtro (${formatDate(data, 'dd/MM', "en_US")})`;
    this.descricaoAtividadeAtual = null;
  }

  filtrarPorMateria(materia: MateriaEnum) {
    this.eventosDisplay = this.EVENTOS.filter(e => e.Materia == materia);
    this.eventosDisplayOrdenar();
    this.filtro = `Remover filtro (${EventoComponent.getNomeMateria(materia)})`;
    this.descricaoAtividadeAtual = null;
  }

  filtrarPorTipo(tipo: TipoEvento) {
    this.eventosDisplay = this.EVENTOS.filter(e => e.Tipo == tipo);
    this.eventosDisplayOrdenar();
    this.filtro = `Remover filtro (${EventoComponent.getNomeTipo(tipo)})`;
    this.descricaoAtividadeAtual = null;
  }    
}
