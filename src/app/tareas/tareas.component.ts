import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Tarea } from '../models/tarea-model';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})


export class TareasComponent implements OnInit {
  tareas: Tarea[] = [];
  today = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  @Input() tarea: Tarea;
  constructor() {
    this.tarea = { "id": 0, "lista": "", "img": "", "titulo": "", "usuarios": [{ "email": "", "img": "", "nick": "", "alt": "" }], "fechaFin": new Date() }
  }

  ngOnInit(): void {
  }

  substringFechas(fecha: Date, tipoLista: string) {

    console.log(fecha)
    let primera = formatDate(fecha, 'yyyy-MM-dd', 'en');
    console.log(primera)
    let resultado = "grey";

    const arraySplit = primera.split('-')
    const arraySplit2 = this.today.split('-')


    if (resultado == "grey") {
      resultado = this.pasado(arraySplit, arraySplit2, tipoLista)
    }

    if (resultado == "grey") {
      resultado = this.falta(arraySplit, arraySplit2)
    }

    return resultado;
  }

  pasado(arraySplit: string[], arraySplit2: string[], tipoLista: string) {

    console.log(arraySplit)
    console.log(arraySplit2)
    console.log(tipoLista)

    if (tipoLista != "Finalizadas") {
      if (arraySplit[0] < arraySplit2[0]) {
        return "red";
      }
      else if (arraySplit[0] == arraySplit2[0] && arraySplit[1] < arraySplit2[1]) {
        return "red"
      }
      else if (arraySplit[0] == arraySplit2[0] && arraySplit[1] == arraySplit2[1] && arraySplit[2] < arraySplit2[2]) {
        return "red"
      }
      else {
        return "grey"
      }
    }
    else if (tipoLista == "Finalizadas") {
      if (arraySplit[0] < arraySplit2[0]) {
        return "green";
      }
      else if (arraySplit[0] == arraySplit2[0] && arraySplit[1] < arraySplit2[1]) {
        return "green"
      }
      else if (arraySplit[0] == arraySplit2[0] && arraySplit[1] == arraySplit2[1] && arraySplit[2] < arraySplit2[2]) {
        return "green"
      }
      else {
        return "grey"
      }
    }
    else {
      return "grey"
    }
  }

  falta(arraySplit: string[], arraySplit2: string[]) {

    var numero: number = +arraySplit[2];
    var numero2: number = +arraySplit2[2];

    if (arraySplit[0] == arraySplit2[0] && arraySplit[1] == arraySplit2[1] && numero - 1 == numero2) {
      return "orange"
    }
    else {
      return "grey"
    }
  }

  DateString(fechaFin: Date) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(fechaFin, 'yyyy-MM-dd');
  }

}
