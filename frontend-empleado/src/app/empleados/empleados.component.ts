import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../models/empleado';
import { EmpleadoService } from '../services/empleado.service';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];
  textoBusqueda: string = '';
  mensaje: string = '';

  empleado: Empleado = {
    nombre: '',
    apellido: '',
    dni: '',
    genero: '',
    estadoCivil: ''
  };

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.empleadoService.listar().subscribe({
      next: data => {
        this.empleados = data;
      },
      error: error => {
        console.error('Error al listar empleados', error);
        this.mensaje = 'Error al cargar empleados';
      }
    });
  }

  guardar(): void {
    if (!this.validarFormulario()) {
      return;
    }

    if (this.empleado.id) {
      this.actualizar();
    } else {
      this.empleadoService.guardar(this.empleado).subscribe({
        next: () => {
          this.mensaje = 'Empleado registrado correctamente';
          this.listar();
          this.limpiarFormulario();
        },
        error: error => {
          console.error('Error al guardar empleado', error);
          this.mensaje = 'No se pudo registrar el empleado';
        }
      });
    }
  }

  editar(empleado: Empleado): void {
    this.empleado = { ...empleado };
    this.mensaje = 'Editando empleado';
  }

  actualizar(): void {
    if (!this.empleado.id) {
      return;
    }

    this.empleadoService.actualizar(this.empleado.id, this.empleado).subscribe({
      next: () => {
        this.mensaje = 'Empleado actualizado correctamente';
        this.listar();
        this.limpiarFormulario();
      },
      error: error => {
        console.error('Error al actualizar empleado', error);
        this.mensaje = 'No se pudo actualizar el empleado';
      }
    });
  }

  eliminar(id?: number): void {
    if (!id) {
      return;
    }

    const confirmar = confirm('¿Está seguro de eliminar este empleado?');

    if (!confirmar) {
      return;
    }

    this.empleadoService.eliminar(id).subscribe({
      next: () => {
        this.mensaje = 'Empleado eliminado correctamente';
        this.listar();
      },
      error: error => {
        console.error('Error al eliminar empleado', error);
        this.mensaje = 'No se pudo eliminar el empleado';
      }
    });
  }

  buscar(): void {
    const texto = this.textoBusqueda.trim();

    if (texto === '') {
      this.listar();
      return;
    }

    this.empleadoService.buscar(texto).subscribe({
      next: data => {
        this.empleados = data;
      },
      error: error => {
        console.error('Error al buscar empleados', error);
        this.mensaje = 'Error al buscar empleados';
      }
    });
  }

  limpiarFormulario(): void {
    this.empleado = {
      nombre: '',
      apellido: '',
      dni: '',
      genero: '',
      estadoCivil: ''
    };
  }

  validarFormulario(): boolean {
    if (
      this.empleado.nombre.trim() === '' ||
      this.empleado.apellido.trim() === '' ||
      this.empleado.dni.trim() === '' ||
      this.empleado.genero.trim() === '' ||
      this.empleado.estadoCivil.trim() === ''
    ) {
      this.mensaje = 'Todos los campos son obligatorios';
      return false;
    }

    if (this.empleado.dni.length !== 8) {
      this.mensaje = 'El DNI debe tener 8 dígitos';
      return false;
    }

    return true;
  }
}