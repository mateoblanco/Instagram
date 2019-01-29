import { Component, OnInit } from '@angular/core';
import {RedisService} from '../../services/redis.service';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {

  usuario: string;
  descripcion: string = "";
  imagen: File = null;
  contenido: string[];
  base64: string;

  constructor(public _servicio: RedisService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(parametros => {
      this.usuario = parametros['usuario'];
    });

  }


  uploadPhoto() {
    /*console.log("Subir foto");*/
    this._servicio.agregarContenido(this.usuario, this.descripcion, this.base64).subscribe(dato => console.log(dato));
    this.router.navigate(['/timeline', this.usuario])

  }

  onFileSelected(event) {
    /*console.log(event);*/
    this.imagen = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.imagen);
    reader.onload = () => {
      this.base64 = reader.result;
    }

    /*console.log(this.imagen);*/
    }

  ngOnInit() {
  }

}
