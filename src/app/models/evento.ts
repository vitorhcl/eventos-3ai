import { formatDate } from "@angular/common";
import { DateHelper } from "../utils/date-helper";
import { DiaSemana } from "./enums/dia-semana";
import { TipoEvento } from "./enums/tipo-evento";
import { MateriaEnum } from "./enums/materia-enum";

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
      if(DateHelper.compararDataSemTempo(this.Entrega, new Date(), (d1, d2) => d1.getTime() === d2.getTime()))
        return 'HOJE';
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
        return this.Entrega === undefined ? DateHelper.getMaxDate() : new Date(this.Entrega.getTime());
    }

    public ToBase36 = (num: number): string => {
        return num.toString(36);
    }

    public ToString = (): string => {
        return `${this.Base36ID} ${this.Entrega == null ? "?????" : this.EntregaFormatada} (${MateriaEnum[this.Materia]}): ${TipoEvento[this.Tipo]} - ${this.Nome}`;
    }
}
