import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Evento } from './models/evento';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'https://vitorhcl.somee.com/SalaAPI/';

  constructor(private http: HttpClient) { }
  eventos: Array<Evento> = new Array<Evento>();

  async get(): Promise<Array<Evento>> {
    const data = await firstValueFrom(this.http.get<Array<Evento>>(this.apiUrl + 'Eventos'));
    data.forEach(item => this.eventos.push(Evento.FromAny(item)));
    return this.eventos;
  }
}