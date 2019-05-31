export class EquipoJuegoDePuntos {

  PuntosTotalesAlumno: number;
  equipoId: number;
  juegoDePuntosId: number;
  id: number;
  nivelId: number;

  constructor(equipoId?: number, juegoDePuntosId?: number, nivelId?: number) {

    this.equipoId = equipoId;
    this.juegoDePuntosId = juegoDePuntosId;
    this.nivelId = nivelId;

  }
}
