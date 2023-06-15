import { Evento } from "./evento";

export class Filtro {
    constructor(eventos: Array<Evento>, nome: string, metodo: (e: Evento) => boolean) {
        this.nome = nome;
        this.expressao = metodo;
        this.eventos = eventos;
    }
    nome: string = "Remover filtro";
    expressao: ((e: Evento) => boolean);
    eventos: Array<Evento>;

    getFilteredList() {
        return this.eventos.filter(this.expressao);
    }
}
