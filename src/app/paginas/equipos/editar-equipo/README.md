# OBJETIVO: editar de una manera fácil el equipo, focalizandonos en agregar/mover/eliminar alumno del equipo


<!-- grupo.component.ts -->

En este componente es importante diferenciar entre 4 grupos de alumnos distinos:

  - alumnos que pertencen al grupo, es decir, los alumnos totales: alumnosGrupo
  - alumnos del equipo, son aquellos que pertenecen al equipo en particular donde hemos entrado: alumnosEquipo
  - alumnos con equipo, son aquellos alumnos dentro del grupo que pertenecen a algun equipo del grupo: alumnosConEquipo
  - alumnos sin equipo, son aquellos alumnos que no tienen equipo y son elegibles: alumnosSinEquipo

Los alumnos del grupo los recibimos del servicio ya que no van a variar durante la edición del equipo. 

También al iniciar el componente consultamos a la API y recuperamos los alumnos del equipo en el momento de abrir el componente. Estos alumnos pueden cambiar al editar el equipo, ya que podemos añadir/eliminar alumnos.

Asi pues, debemos hacer una clasificación entre los alumnos que tienen equipo y los que no, ya que podrán ser elegidos en otro equipo. Para eso ejecutamos la función ClasificacionAlumnos();


# ClasificacionAlumnos()

Esta función recupera todas las asignaciones del grupo en el que nos encontramos. Si encuentra asignaciones las mete en el parámetro asignacionEquipo y, haya o no asignaciones, ejecuta la función AlumnosAsignables().

# AlumnosAsignables()

Recorre todos los alumnos del grupo uno por uno. Si ha encontrado asignaciones en la función prévia, entonces busca (mediante la función BuscarAlumnosAsignacionEquipo) si ese alumno tiene alguna asignación en ese grupo. Si tiene alguna asignación signfica que ya tiene equipo y, por tanto, lo meto en la lista de alumnosConEquipo. 

Si por el contrario no encuentra ninguna asignación correspondiente con el identificador del alumno, significa que no tiene equipo y los metemos en alumnosSinEquipo.

Si no habia asignaciones en el grupo, significa que todos los alumnos son elegibles y, por tanto, todos son alumnosSinEquipo.

# BuscarAlumnosAsignacionEquipo(alumnoId)

Esta función recibe como parámetro el identificador del alumno y devuelve true o false en función de si encuentra alguna asignacion dentro del parámetro asignacionEquipo en el que el alumnoId conincida el identificador del alumno que le pasamos.

# AlumnosDelEquipo()

Consulta en la base de datos los alumnos del equipo. Se utiliza para actualizar el parámetro alumnosEquipo y, por tanto, la tabla.

# AlumnoBorrado()

Si borramos a un alumno del equipo deberemos de pasarlo de la lista de alumnosConEquipo a alumosSinEquipo. Para ello se usan filters para borraro de la primera lista y se utiliza el push para añadirlo a la segunda. Esta función se ejecutará cuando se borre el alumno de la API.

# BorrarAlumnoEquipo()

Busca en la base de datos la asignacionEquipo que vincula al alumno y el equipo del que lo queremos borrar. Una vez la encuentra, hace un DELETE y ejecuta la función anterior (AlumnoBorrado()). Si lo borra correctamente, actualiza la tabla mediante la función AlumnosDelEquipo().

# AbrirDialogoAgregarAlumnosEquipo()

Abrirá el componente agregar-alumno-equipo enviandole los alumnos del equipo y los alumnos sin equipo (los que pueden ser escogidos), además del equipo. Solo nos interesan los alumnos que pueden ser elegidos, no los que no.

Al cerrar el dialogo, recuperaremos los alumnos del equipo que pasamos del componente agregar-alumno-equipo. Si fuese undefined (si clicamos fuera del dialog se cierra sin enviar nada, aunque ahora se ha puesto que no se pueda) llamaría a la función AlumnosDelEquipo.

Limpiaremos los array de los alumnos con y sin equipo y volveremos a hacer la clasificación después de cerrar el componente de agregar alumno.

<!-- grupo.component.html -->

Utilizaremos un mat-tab-group. El contenido del primer mat-tab será la lista de grupos, mientras que en el segundo podremos crear un nuevo equipo.

Si nos encontramos en lista de equipo, si hay equipos mostrará la lista, sino irá al template Aviso_no_equipos. 

Hacemos una lista de accordion, es decir, una lista con desplegables. Si hay equipos mostrará en la lista el nombre del equipo y al clicar encima sabrá en el equipo que he clicado y, por consiguiente, su identificador. Esto ejecutará la función AlumnosDelEquipo del equipo que pasemos como parámetro, y nos devolverá la lista de alumnos. 

También nos aparecerán los botones editar(que nos llevará a su componente) y eliminar equipo (abrirá el dialogo de confirmación).


