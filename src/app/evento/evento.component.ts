import { Component, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent {
  @Input() evento: Evento = new Evento();

  eventoComponent = EventoComponent;

  ngOnInit(){
    console.log('Nome: ' + this.evento.Nome);
  }

  @Output() filtroDataEvent = new EventEmitter<Date>();
  @Output() filtroMateriaEvent = new EventEmitter<MateriaEnum>();
  @Output() exibirDescricaoEvent = new EventEmitter<number>();
  @Output() filtroTipoEvent = new EventEmitter<TipoEvento>();

  public static getNomeMateria(valorMateria: number): string {
    return MateriaEnum[valorMateria];
  }

  public static getNomeTipo(valorTipo: TipoEvento) {
    return TipoEvento[valorTipo];
  }

  copiarTexto = (texto: string) => {
    navigator.clipboard.writeText(texto);
  }

  filtrarPorData(data?: Date) {
    if(data != null)
      this.filtroDataEvent.emit(data);
  }

  filtrarPorMateria(materia: MateriaEnum) {
    this.filtroMateriaEvent.emit(materia);
  }

  filtrarPorTipo(tipo: TipoEvento) {
    this.filtroTipoEvent.emit(tipo);
  }

  exibirDescricao(id: number) {
    this.exibirDescricaoEvent.emit(id);
  }
}

export class Evento {
  public Id!: number;
  public Nome!: string;
  public Materia!: MateriaEnum;
  public Descricao?: string;
  public Entrega?: Date;
  public Tipo!: TipoEvento;

  constructor() {
  }

  public static FromAny(data: any) {
    var evento = new Evento();
    evento.Id = data.id;
    evento.Nome = data.nome;
    evento.Materia = data.materia;
    evento.Descricao = data.descricao;
    evento.Entrega = data.entrega === null ? undefined : new Date(data.entrega);
    evento.Tipo = data.tipo;
    return evento;
  }

  public get Base36ID(): string {
    return this.ToBase36(this.Id).toUpperCase().padStart(2, '0');
  }

  public get EntregaFormatada(): string {
    if(this.Entrega === undefined)
      return '?????';
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
    const daysOffset = Math.round(((new Date().getTime() - firstDayOfYear.getTime()) / oneDay));
    const weekNumber1 = Math.ceil((daysOffset + firstDayOfYear.getDay() + 1) / 7);

    const daysOffset2 = Math.round(((this.EntregaNN.getTime() - firstDayOfYear.getTime()) / oneDay));
    const weekNumber2 = Math.ceil((daysOffset2 + firstDayOfYear.getDay() + 1) / 7);
    if(weekNumber1 !== weekNumber2)
      return formatDate(this.EntregaNN, 'dd/MM', "en_US");
    return String(DiaSemana[this.EntregaNN.getDay()]);
  }

  public get EntregaNN(): Date {
    return this.Entrega === undefined ? new Date(new Date().getTime() + 86400000) : new Date(this.Entrega.getTime());
  }

  private ToBase36 = (num: number): string => {
    return num.toString(36);
  }

  public ToString = (): string => {
    return `${this.Base36ID} ${this.Entrega == null ? "?????" : this.EntregaFormatada} (${MateriaEnum[this.Materia]}): ${TipoEvento[this.Tipo]} - ${this.Nome}`;
  }
}

export enum MateriaEnum {
  OUTRA = 1,
  BIO = 2,
  FILO = 3,
  GEO = 4,
  ING = 5,
  IPSSI = 6,
  LPL = 7,
  MAT = 8,
  PAM = 9,
  PW = 10,
  QTS = 11,
  SEBI = 12,
  SOC = 13,
  TCC = 14,
}

export enum TipoEvento {
	Outro = 1,
	Atividade = 2,
	Trabalho = 3,
	Prova = 4,
	Reuniao = 5,
	Questoes = 6,
	Lista = 7,
	Apresentacao = 8,
	Pesquisa = 9,
  Questionario = 10,
	Enquete = 11,
	Inscricao = 12
}

export enum DiaSemana {
  Dom = 0,
  Seg = 1,
  Ter = 2,
  Qua = 3,
  Qui = 4,
  Sex = 5,
  Sab = 6
}
