# OBJETIVO: el objetivo es crear un dialogo común para cuando queramos confirmar una acción (como eliminar, asignar puntos, asignar cromos, etc)

<!-- editar-equipo.component.ts -->

El componente recibe un mensaje particular (incluyendo el nombre del grupo, equipo,... que queramos borrar) del componente que viene para cada caso y los botones siempre serán "Aceptar" y "Cancelar"



<!-- editar-equipo.component.html -->

Mostrará el mensaje y los dos botones. En función de lo que cliquemos devuelve un Boolean que recogeremos en los componentes. Si es true, procederemos a hacer la función para la que se nos pregunta.




