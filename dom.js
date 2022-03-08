let tabla = document.querySelector("#tabla");

let cuerpo = document.createElement("tbody");
let tr;

tareas.forEach(tarea => {
    tr = document.createElement("tr");
    // tr.setAttribute("class", "clasequequiero")
    tr.innerHTML =
        `
    <th>${tarea.descripcion}</th>
    <th>${tarea.hora}</th>
    <th>${tarea.prioridad}</th>
    `
    cuerpo.appendChild(tr);
});

tabla.appendChild(cuerpo);

//////////////////////////////////////////////////

let tareasPend = document.querySelector("#pendingTask");

tareasPend.innerHTML = 
`You have ${cantidad} pending tasks.`