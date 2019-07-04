export class EquipoJuegoDeColeccion {

  equipoId: number;
  juegoDeColeccionId: number;
  id: number;

  constructor(equipoId?: number, juegoDePuntosId?: number) {

    this.equipoId = equipoId;
    this.juegoDeColeccionId = juegoDePuntosId;

  }
}
