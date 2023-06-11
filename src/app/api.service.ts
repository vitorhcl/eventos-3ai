import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from './evento/evento.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'https://vitorhcl.somee.com/SalaAPI/';

  constructor(private http: HttpClient) { }
  eventos: Array<Evento> = new Array<Evento>();

  async get(): Promise<Array<Evento>> {
    console.log('Trying to fetch API')
    const data = await firstValueFrom(this.http.get<Array<Evento>>(this.apiUrl + 'Eventos'));
    console.log(data);
    data.forEach(item => this.eventos.push(Evento.FromAny(item)));
    console.log('Treated data:');
    console.log(this.eventos);
    return this.eventos;
  }
}