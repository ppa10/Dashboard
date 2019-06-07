export class Coleccion {
  Nombre: string;
  ImagenColeccion: string;
  id: number;
  profesorId: number;

  constructor(nombre?: string, ImagenColeccion?: string) {

    this.Nombre = nombre;
    this.ImagenColeccion = ImagenColeccion;
  }
}
