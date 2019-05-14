# OBJETIVO: mostrar los equipos de una manera ordenada y eficaz


<!-- grupo.component.ts -->

Se ha optado por utilizar listas desplegables. Al principio solo podremos ver el nombre del equipo, pero si clicamos encima se desplega y podremos ver los alumnos que forman el equipo y la opción de editar o eliminar.

Al iniciar el componente recibimos el identificador del grupo en el que nos encontramos para saber que equipos tiene dicho equipo. Esto se hace mediante la función EquiposDelGrupo().


# EquiposDelGrupo()

Esta función recibe un array con todos los equipos que forman parte del grupo cuyo identificador pasamos como parámetro y los mete dentro del parámetro listaEquipos.


En la pantalla veremos las 5 opciones que tenemos con el grupo mediante botones correspondientes a: Editar grupo, pasar lista, equipos, juegos, eliminar grupo.

# AlumnosDelEquipo()

Le pasamos como parámetro el identificador de un equipo y nos devuelve los alumnos que tiene. Esto se hace porque una vez listado todos los equipos, dentro buscaremos los alumnos que tiene cada uno de los equipos listados.

# EnviarEquipoEditar()

Al desplegar un equipo tendremos la opción de editarlo o borrarlo. Si decidimos editarlo se abrirá otro componente (editar-equipo) en el que podremos modificar los alumnos que tiene o el nombre.

# EliminarEquipo()

Esta función hace un DELETE en la api del equipo en el que nos encontramos. Además también hace un DELETE de todas las "asignacionEquipo" que tenía dicho equipo (mediante EliminarAsginacionesEquipo()) para que no queden POSTs "basura" en la API.

# EliminarAsginacionesEquipo()

Recupera todas las asignacionEquipo del equipo y hace un bucle recorriendolas todas y borrandolas una a una. Si el equipo no tenia asignaciones (alumnos), hace un console.log diciendo que no hay asignaciones.

# AbrirDialogoConfirmacionBorrar()

Funciona de la misma manera que cuando borrabamos un grupo, explicado en el README-grupo.md

<!-- grupo.component.html -->

Utilizaremos un mat-tab-group. El contenido del primer mat-tab será la lista de grupos, mientras que en el segundo podremos crear un nuevo equipo.

Si nos encontramos en lista de equipo, si hay equipos mostrará la lista, sino irá al template Aviso_no_equipos. 

Hacemos una lista de accordion, es decir, una lista con desplegables. Si hay equipos mostrará en la lista el nombre del equipo y al clicar encima sabrá en el equipo que he clicado y, por consiguiente, su identificador. Esto ejecutará la función AlumnosDelEquipo del equipo que pasemos como parámetro, y nos devolverá la lista de alumnos. 

También nos aparecerán los botones editar(que nos llevará a su componente) y eliminar equipo (abrirá el dialogo de confirmación).


