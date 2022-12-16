import { Component, OnInit } from '@angular/core';;
import { Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario-model';
import { FormBuilder, FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tarea } from '../models/tarea-model';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.css']
})

export class TareaFormComponent implements OnInit {

  // INPUTS / OUTPUTS

  @Output() cancelarTarea = new EventEmitter<boolean>(); // Se emite si se quiere cancelar la tarea (FALSE)
  @Output() guardarTarea = new EventEmitter<Tarea>(); // Output para guardar la tarea emitiendo el objeto TAREA
  @Input() tarea: Tarea;
  @Input() editando: boolean;
  @Output() editGuardado = new EventEmitter<boolean>();

  nuevaTarea: FormGroup; // Grupo para almacenar el contenido del formulario de creación / edición de tareas
  objetoTarea: Tarea; // Objeto usado para almacenar la información recolectada vía el formulario en forma de objeto Tarea



  arrayUsuarios: Usuario[];

  constructor(fb: FormBuilder) { // CONSTRUCTOR

    this.tarea = { "id": 0, "lista": "", "img": "", "titulo": "", "usuarios": [{ "email": "", "img": "", "nick": "", "alt": "" }], "fechaFin": new Date() }

    this.nuevaTarea = fb.group({ // FORM GROUP (Elementos que incluye el formulario)
      id: fb.control('initial value'),
      lista: fb.control('initial value'),
      img: fb.control('initial value'),
      titulo: fb.control('initial value'),
      usuarios: fb.control('initial value'),
      fechaFin: fb.control('initial value')
    });


    this.objetoTarea = {
      "id": 0, "lista": "", "img":
        "", "titulo": "",
      "usuarios": [{
        "email": "", "img":
          "", "nick": "", "alt":
          ""
      }], "fechaFin": new Date()
    }

    this.arrayUsuarios = [{ "email": "ejemplo1@gmail.com", "img": "https://picsum.photos/200", "nick": "Ejemplo1", "alt": "Ejemplo1" }, { "email": "ejemplo2@gmail.com", "img": "https://picsum.photos/200", "nick": "Ejemplo2", "alt": "Ejemplo2" }]
    this.arrayVisibilidad = [false, false]

    this.editando = false;
  }

  ngOnInit(): void {

    this.nuevaTarea = new FormGroup({
      id: new FormControl(3),

      lista: new FormControl('', Validators.required),

      img: new FormControl(''),

      titulo: new FormControl('', Validators.required),

      usuarios: new FormControl(''),

      fechaFin: new FormControl('')

    });

    if (this.editando == true) {
      console.log("setvalue")
      console.log(this.tarea)
      this.nuevaTarea.setValue({
        id: this.tarea.id,
        lista: this.tarea.lista,
        img: this.tarea.img,
        titulo: this.tarea.titulo,
        usuarios: this.tarea.usuarios,
        fechaFin: this.tarea.fechaFin

      })
    }
  }

  arrayVisibilidad: boolean[];


  valor = true;

  cancelarTareaEstado() {
    this.cancelarTarea.emit(this.valor)
  }

  mostrarUsuario() {
    if (this.arrayVisibilidad[0] == true) {
      this.arrayVisibilidad[1] = true;
      this.objetoTarea.usuarios.push(this.arrayUsuarios[1])
    }
    else if (this.arrayVisibilidad[1] == false) {
      this.arrayVisibilidad[0] = true
      this.objetoTarea.usuarios.push(this.arrayUsuarios[0])
    }
    else if (this.arrayVisibilidad[1] == true) {
      this.arrayVisibilidad[0] = true
      this.objetoTarea.usuarios.push(this.arrayUsuarios[0])
    }

  }

  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }


  onClickSubmit(data: any) {

    if (this.editando == true) {
      this.editGuardado.emit(true);
    }
    else {
      this.editGuardado.emit(false);
    }

    console.log(data.usuarios)

    this.objetoTarea.id = data.id;
    this.objetoTarea.lista = data.lista;
    this.objetoTarea.img = data.img;
    this.objetoTarea.titulo = data.titulo;
    this.objetoTarea.fechaFin = data.fechaFin;

    console.log(this.arrayUsuarios)
    this.guardarTarea.emit(this.objetoTarea);

  }

  borrarUsuario(data: Usuario) {
    console.log(data)
    for (let i = 0; i < this.arrayUsuarios.length; i++) {
      if (this.arrayUsuarios[i] == data) {
        this.arrayVisibilidad[i] = false;
      }
    }
  }
}


