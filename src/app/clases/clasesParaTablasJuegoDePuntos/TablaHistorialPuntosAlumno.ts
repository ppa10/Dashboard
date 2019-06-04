export class TablaHistorialPuntosAlumno {


  nombre: string;
  descripcion: string;
  valorPunto: number;
  alumnoJuegoDePuntosId: number;
  historialId: number;

  constructor(nombre?: string, descripcion?: string, valorPunto?: number, alumnoJuegoDePuntosId?: number, historialId?: number) {

    this.nombre = nombre;
    this.descripcion = descripcion;
    this.valorPunto = valorPunto;
    this.alumnoJuegoDePuntosId = alumnoJuegoDePuntosId;
    this.historialId = historialId;
  }
}
