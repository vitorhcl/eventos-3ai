import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EventoComponent } from '../evento/evento.component';
import { Evento } from '../models/evento';
import { TipoEvento } from '../models/enums/tipo-evento';
import { MateriaEnum } from '../models/enums/materia-enum';
import { Filtro } from '../models/filtro';
import { DateHelper } from '../utils/date-helper';
import { TipoFiltro } from '../models/enums/tipo-filtro';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  title = 'Eventos 3AI';
  @Input() EVENTOS: Array<Evento> = new Array<Evento>();
  eventosDisplay: Array<Evento> = new Array<Evento>();
  filtros: Array<Filtro> = new Array<Filtro>();
  filtroStr: string | null = null;
  descricaoAtividadeAtual: string | null = null;

  constructor() {
  }

  ngOnInit() {
    this.eventosDisplay = this.EVENTOS;
    this.eventosDisplay.sort((a, b) => a.Entrega === undefined ? -1 : (a.Entrega! < b.Entrega! ? -1 : 1));
    this.eventosDisplayOrdenar();
  }

  eventosDisplayOrdenar() {
    this.eventosDisplay = this.EVENTOS;
    this.filtros.forEach((filtro: Filtro) => {
      this.filtroStr = filtro.nome;
      this.eventosDisplay = this.eventosDisplay.filter(filtro.expressao);
    });
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

  filtroDescricaoAtivo() {
    return this.filtros.find(filtro => filtro.tipo == TipoFiltro.SINGLE) != undefined;
  }

  removerFiltros() {
    this.filtroStr = null;
    this.eventosDisplayOrdenar();
    this.filtros = [];
    this.descricaoAtividadeAtual = null;
  }

  exibirAtividade(id: number) {
    this.removerFiltros();
    let evento: Evento | undefined = this.EVENTOS.find(e => e.Id == id);
    if(evento !== undefined) {
      if(evento?.Descricao == null)
        this.descricaoAtividadeAtual = null;
      else
        this.descricaoAtividadeAtual = evento?.Descricao;
        console.log(this.descricaoAtividadeAtual);
        var metodoFiltro = ((e: Evento) => e.Id === id);
        var filtro = new Filtro(TipoFiltro.SINGLE, this.EVENTOS, `Ocultar descrição (${evento.Base36ID})`, metodoFiltro);
        if(this.filtros.find(f => f.nome.startsWith('Ocultar descrição')) == undefined)
          this.filtros.push(filtro);
        this.eventosDisplayOrdenar();
    }
  }

  filtrarPorData(data: Date) {
    if(this.filtros.find(f => f.tipo == TipoFiltro.SINGLE) != undefined)
      this.filtros = [];
    if(this.filtros.find(f => f.tipo == TipoFiltro.DATA))
      return;
    var metodoFiltro = ((e: Evento) => DateHelper.compararDataSemTempo(e.EntregaNN, data, (d1: Date, d2: Date) => d1.getTime() === d2.getTime()));
    var filtro = new Filtro(TipoFiltro.DATA, this.EVENTOS, `Remover filtro (${formatDate(data, 'dd/MM', "en_US")})`, metodoFiltro);
    if(this.filtros.find(f => f === filtro) == undefined)
      this.filtros.push(filtro);
    this.eventosDisplayOrdenar();
    this.descricaoAtividadeAtual = null;
  }

  filtrarPorMateria(materia: MateriaEnum) {
    if(this.filtros.find(f => f.tipo == TipoFiltro.SINGLE) != undefined)
      this.filtros = [];
    if(this.filtros.find(f => f.tipo == TipoFiltro.MATERIA))
      return;
    var metodoFiltro = ((e: Evento) => e.Materia == materia);
    var filtro = new Filtro(TipoFiltro.MATERIA, this.EVENTOS, `Remover filtro (${EventoComponent.getNomeMateria(materia)})`, metodoFiltro);
    if(this.filtros.find(f => f === filtro) == undefined)
      this.filtros.push(filtro);
    this.eventosDisplayOrdenar();
    this.descricaoAtividadeAtual = null;
  }

  filtrarPorTipo(tipo: TipoEvento) {
    if(this.filtros.find(f => f.tipo == TipoFiltro.SINGLE) != undefined)
      this.filtros = [];
    if(this.filtros.find(f => f.tipo == TipoFiltro.TIPO_EVENTO))
      return;
    var metodoFiltro = ((e: Evento) => e.Tipo == tipo);
    var filtro = new Filtro(TipoFiltro.TIPO_EVENTO, this.EVENTOS, `Remover filtro (${EventoComponent.getNomeTipo(tipo)})`, metodoFiltro);
    if(this.filtros.find(f => f === filtro) == undefined)
      this.filtros.push(filtro);
    this.eventosDisplayOrdenar();
    this.descricaoAtividadeAtual = null;
  }    
}
