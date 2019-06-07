export class HistorialPuntosEquipo {

  ValorPunto: number;
  puntoId: number;
  equipoJuegoDePuntosId: number;
  id: number;

  constructor(ValorPunto?: number, puntoId?: number, equipoJuegoDePuntosId?: number) {

    this.ValorPunto = ValorPunto;
    this.puntoId = puntoId;
    this.equipoJuegoDePuntosId = equipoJuegoDePuntosId;

  }
}
