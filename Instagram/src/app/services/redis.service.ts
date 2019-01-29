import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class RedisService {

  constructor(private httpClient: HttpClient) {
  }



  agregarContenido(usuario: string, descripcion: string, foto: string) {
    const headers = this.getHeaders();

    const contenido = {
      usuario: usuario,
      descripcion: descripcion,
      foto : foto
    }

    const url = 'http://127.0.0.1:5002/cargarContenido';
    return this.httpClient.post(url, contenido, {headers})
          .map((data: any) => {
            return data;
          });
  }

  agregarHistoria(usuario: string, foto: string) {
    const headers = this.getHeaders();

    const contenido = {
      usuario: usuario,
      foto : foto
    }

    const url = 'http://127.0.0.1:5002/cargarHistoria';
    return this.httpClient.post(url, contenido, {headers})
          .map((data: any) => {
            return data;
          });
  }

  getTimeline(usuario: string) {
    let headers = this.getHeaders();

    let url = `http://127.0.0.1:5002/getTimeline/${usuario}`;
    return this.httpClient.get(url, {headers})
          .map((data: any) => {
            return data.contenido;
          });
  }

  getFotos(usuario: string) {
    let headers = this.getHeaders();

    let url = `http://127.0.0.1:5002/getFotos/${usuario}`;
    return this.httpClient.get(url, {headers})
          .map((data: any) => {
            return data.contenido;
          });
  }

  getHistorias(usuario: string) {
    let headers = this.getHeaders();

    let url = `http://127.0.0.1:5002/getHistorias/${usuario}`;
    return this.httpClient.get(url, {headers})
          .map((data: any) => {
            return data.contenido;
          });
  }

  private getHeaders(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }

}
