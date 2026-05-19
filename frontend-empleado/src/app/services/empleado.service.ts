import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
    providedIn: 'root'
})
export class EmpleadoService {

    private apiUrl = 'http://localhost:8082/api/empleados';

    constructor(private http: HttpClient) { }

    listar(): Observable<Empleado[]> {
        return this.http.get<Empleado[]>(this.apiUrl);
    }

    buscar(texto: string): Observable<Empleado[]> {
        return this.http.get<Empleado[]>(`${this.apiUrl}/buscar?texto=${texto}`);
    }

    guardar(empleado: Empleado): Observable<Empleado> {
        return this.http.post<Empleado>(this.apiUrl, empleado);
    }

    actualizar(id: number, empleado: Empleado): Observable<Empleado> {
        return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado);
    }

    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}