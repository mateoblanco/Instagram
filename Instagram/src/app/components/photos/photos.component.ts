import { Component, OnInit } from '@angular/core';
import {RedisService} from '../../services/redis.service';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html'
})
export class PhotosComponent implements OnInit {

  usuario: string;
  fotos: string[] = [];

  constructor(public _servicio: RedisService, private route: ActivatedRoute) {
    this.route.params.subscribe(parametros => {
      this.usuario = parametros['usuario'];
    });

    this._servicio.getFotos(this.usuario).subscribe(datos => {
      /*console.log("fotos")
      console.log(datos)*/
      this.fotos = datos
      });

   }

  ngOnInit() {
  }

}
