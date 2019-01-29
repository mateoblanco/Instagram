import { Component, OnInit } from '@angular/core';
import {RedisService} from '../../services/redis.service';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {

  usuario: string;
  contenido: string[] = [];

  imagenHistoria: File = null;
  historias: string[];
  base64: string;



  constructor(public _servicio: RedisService, private route: ActivatedRoute, private router:Router) {

    this.route.params.subscribe(parametros => {
      this.usuario = parametros['usuario'];
    });

    this._servicio.getTimeline(this.usuario).subscribe(datos => {
      /*console.log("timeline")
      console.log(datos)*/
      this.contenido = datos
      });

      this._servicio.getHistorias(this.usuario).subscribe(datos => {
        this.historias = datos;
        });
  }



  uploadHistory() {
    /*console.log("Subir historia");*/
    this._servicio.agregarHistoria(this.usuario, this.base64).subscribe(dato => console.log(dato));
    this._servicio.getHistorias(this.usuario).subscribe(datos => {
      /*console.log("historias")
      console.log(datos)*/
      this.historias = datos;
      });
  }

  onFileSelected(event) {
    /*console.log(event);*/
    this.imagenHistoria = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenHistoria);
    reader.onload = () => {
      this.base64 = reader.result;
    }
  }

  ngOnInit() {

  }


  }
