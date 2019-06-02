export class HistorialPuntosAlumno {

  ValorPunto: number;
  puntoId: number;
  alumnoJuegoDePuntosId: number;
  id: number;

  constructor(ValorPunto?: number, puntoId?: number, alumnoJuegoDePuntosId?: number) {

    this.ValorPunto = ValorPunto;
    this.puntoId = puntoId;
    this.alumnoJuegoDePuntosId = alumnoJuegoDePuntosId;

  }
}
