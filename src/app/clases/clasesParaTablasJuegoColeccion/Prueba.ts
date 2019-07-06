export class Prueba {

  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  cromo: number;

  constructor(nombre?: string, primerApellido?: string, segundoApellido?: string, cromo?: number) {

    this.nombre = nombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.cromo = cromo;
  }
}
