import { TipoFiltro } from "./enums/tipo-filtro";
import { Evento } from "./evento";

export class Filtro {
    constructor(tipo: TipoFiltro, eventos: Array<Evento>, removerStr: string, metodo: (e: Evento) => boolean) {
        this.nome = removerStr;
        this.expressao = metodo;
        this.eventos = eventos;
        this.tipo = tipo;
    }
    nome: string = "Remover filtro";
    expressao: ((e: Evento) => boolean);
    eventos: Array<Evento>;
    tipo: TipoFiltro;

    getFilteredList() {
        return this.eventos.filter(this.expressao);
    }
}
