import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Evento } from '../models/evento';
import { TipoEvento } from '../models/enums/tipo-evento';
import { MateriaEnum } from '../models/enums/materia-enum';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent {
  @Input() evento: Evento = new Evento();

  eventoComponent = EventoComponent;

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
