import { Component } from '@angular/core';
import { Tarea } from './models/tarea-model';
import { Input } from '@angular/core';
import { Usuario } from './models/usuario-model';

const k_PENDIENTES_LISTA: string = "Pendientes";
const k_PROGRESO_LISTA: string = "Progreso";
const k_FINALIZADAS_LISTA: string = "Finalizadas";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input('childToParent') Xcambiar = true;

  listas: string[] = [];
  tareas: Tarea[];
  campo: string = ""
  tareaCache: Tarea
  tareaReinicio: Tarea;
  constructor() {
    const tareasJSON: string = `{
      "tareas": [
      { "id": 0, "lista": "${k_FINALIZADAS_LISTA}", "img":
      "https://picsum.photos/300/200", "titulo": "Tarea 1: Diseño UI",
      "usuarios": [{"email": "lponts@ilerna.com", "img":
      "https://picsum.photos/300/300", "nick": "Juan", "alt":
      "Usuario"}], "fechaFin": "2019-01-16" },
      
          {"id": 1, "lista": "${k_PROGRESO_LISTA}", "img": "https://picsum.photos/300/200",
        "titulo":"Tarea 2: Diseño de todo el Backend", "usuarios": null, "fechaFin": "2022-11-09"},
      
      
      { "id": 2, "lista": "${k_PENDIENTES_LISTA}", "img": null,
      "titulo": "Tarea 3: Diseño de la base de datos", "usuarios":
      [{"email": "jdominguez@ilerna.com", "img":
      "https://picsum.photos/200/200", "nick": "Jose", "alt": "Usuario"},
      { "email": "lponts@ilerna.com", "img":
      "https://picsum.photos/100/100", "nick": "Laura", "alt":
      "Usuario"}], "fechaFin": "2022-11-16" },
      
      { "id": 3, "lista": "${k_PENDIENTES_LISTA}", "img": null,
      "titulo": "Tarea 4: Implementar todo el Front-End", "usuarios": [],
      "fechaFin": null }
      ]
      }`;

    const tareasDict: any = JSON.parse(tareasJSON);
    this.tareas = tareasDict['tareas'];
    this.listas.push(k_PENDIENTES_LISTA);
    this.listas.push(k_PROGRESO_LISTA);
    this.listas.push(k_FINALIZADAS_LISTA);

    this.tareaReinicio = { "id": 0, "lista": "", "img": "", "titulo": "", "usuarios": [{ "email": "", "img": "", "nick": "", "alt": "" }], "fechaFin": new Date() }
    this.tareaCache = { "id": 0, "lista": "", "img": "", "titulo": "", "usuarios": [{ "email": "", "img": "", "nick": "", "alt": "" }], "fechaFin": new Date() }
  }


  cambiar(cambiar: any, editar?: boolean) {
    this.Xcambiar = cambiar;
    if (editar != null) {
      this.editando = editar;
    }
  }

  crearNuevaTarea(tarea: Tarea) {
    tarea.usuarios.shift()
    this.tareas.push(tarea);
    console.log(this.tareas)
    this.Xcambiar = true;
  }

  editando = false;

  editarTarea(tarea: Tarea, editar?: boolean) {
    this.editando = true;
    this.tareaCache = tarea
    this.cambiar(false)
  }

  eliminarOriginal(editado: boolean) {
    if (editado) {
      for (let i = 0; i < this.tareas.length; i++) {
        if (this.tareas[i] == this.tareaCache) {
          this.tareas.splice(i, 1)
        }
      }
    }
    this.tareaCache = this.tareaReinicio;

  }
}

