# OBJETIVO: Mostrar el juego de coleccion activo.

<!-- juego-de-coleccion-seleccionado-activo.component.ts -->

Recuperaremos el juego y los alumnos del grupo que enviamos al servicio en juego.component.ts. Por lo que recibiremos el juego del servicio y los alumnos y los metemos en el parámetro juego y alumnos respectivamente. 

Después activaremos la función EquiposDelGrupo() y GET_ListaColecciones().

# AlumnosDelJuego()

Recupera los alumnos del juego y los guarda en el array alumnosDelJuego. 

# RecuperarInscripcionesAlumnoJuego()

Recupera las inscripciones de los alumnos en el juego y los puntos que tienen y los ordena de mayor a menor valor.

# EquiposDelJuego()

Recupera los equipos del juego y los guarda en el array equiposDelGrupo.

# RecuperarInscripcionesEquiposJuego()

Recupera las inscripciones de los equipos en el juego y los puntos que tienen y los ordena de mayor a menor valor.



# AlumnosDelEquipo()

Esta función ha sido explicada en componente de equipos en el README-equipos.md.

# AccederAlumno()

Envia al servicio al alumno y la inscripción del alumno que se ha seleccionado, para obtener más información.

# AccederEquipo()

Envia al servicio al equipo y la inscripción del equipo que se ha seleccionado, para obtener más información.

# DesactivarJuego()

Hace un PUT en la api del estado del juego y 

# AbrirDialogoConfirmacionDesactivar()

Abrimos el componente para confirmar que quiero desactivar el juego.
