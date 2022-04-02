class Lista {
    constructor(descripcion, fecha, hora, estado, id) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
        this.id = id;
    }
}

let listas = [];

// busca una tarea que recibe por parametro en el storage
// devuelve boolean si encuentra o no la tarea 
function buscarTarea(valor) {
    let valorGuardado = getTareas();
    for (const tarea of valorGuardado) {
        if (tarea.descripcion == valor) {
            return true;
        }
    }
    return false;
}

// guarda las tareas en el storage
function setTareas(lista) {
    localStorage.setItem("tarea", JSON.stringify(lista));
}

// me trae las tareas del storage
function getTareas() {
    let listaTarea = JSON.parse(localStorage.getItem("tarea"));
    if (listaTarea == null || listaTarea == undefined) {
        return [];
    }
    return listaTarea;
}

//
function setId(id) {
    localStorage.setItem("Id", JSON.stringify(id));
}

//
function getId() {
    let id = JSON.parse(localStorage.getItem("Id"));
    if (id == null || id == undefined) {
        return 0;
    }
    return id;
}

const btnSave = document.querySelector("#botonSubmit");
let tableBody = document.querySelector("#contenedorBody");
const btnEliminarAll = document.querySelector("#btnDeleteAll");

imprimirTareas();

btnSave.addEventListener("click", (e) => {
    e.preventDefault();

    guardarTareas();
});

function guardarTareas() {
    let id = getId();
    id++;
    const descripcionInput = document.querySelector("#form1").value;
    const fechaInput = document.querySelector("#date").value;
    const horaInput = document.querySelector("#time").value;

    if (descripcionInput.trim() === "" || fechaInput.trim() === "" || horaInput.trim() === "") {
        Swal.fire({
            title: "INVALID",
            text: "Fill in all the fields to continue",
            icon: "error"
        });
    } else {
        if (buscarTarea(descripcionInput)) {
            Swal.fire({
                title: "REPEATED TASK",
                text: "Enter a different task",
                icon: "error"
            });
        } else {
            let valoresStorage = getTareas();
            valoresStorage.push(new Lista(`${descripcionInput}`, `${fechaInput}`, `${horaInput}`, false, id));

            setTareas(valoresStorage);
            setId(id);
            imprimirTareas();
        }
    }
    document.getElementById("formulario").reset();
}

function imprimirTareas() {
    let tableBody = document.querySelector("#contenedorBody");
    tableBody.textContent = "";

    let tr;
    let listas = getTareas();
    listas.forEach((tarea) => {
        tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${tarea.descripcion}</td>
        <td>${tarea.fecha}</td>
        <td>${tarea.hora}</td>
        <button id="hecho${tarea.id}" class="btn btn-dark ms-1" type="submit">Finished</button>
        `;

        tr.setAttribute("class", `done${tarea.id}`);
        tableBody.appendChild(tr);
        const btnDone = document.querySelector(`#hecho${tarea.id}`);

        btnDone.addEventListener("click", () => {
            tarea.estado = !tarea.estado;
            if (tarea.estado == true) {
                btnDone.innerText = "";
                btnDone.innerText = "Unfinished";
                trDone.setAttribute("style", "text-decoration:line-through");

                Toastify({
                    text: "Nice! You're finally doing your shit :)",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "#007F66"
                    }
                }).showToast();

            } else {
                btnDone.innerText = "";
                btnDone.innerText = "Finished";
                trDone.setAttribute("style", "text-decoration:initial");
            }
            setTareas(listas);
        });

        const trDone = document.querySelector(`.done${tarea.id}`);
        if (tarea.estado == true) {
            btnDone.innerText = "";
            btnDone.innerText = "Unfinished";
            trDone.setAttribute("style", "text-decoration:line-through");
        } else {
            btnDone.innerText = "";
            btnDone.innerText = "Finished";
            trDone.setAttribute("style", "text-decoration:initial");
        }
    });
}

btnEliminarAll.onclick = () => {
    Swal.fire({
        title: "DO YOU WANT TO DELETE ALL THE TASK?",
        showCancelButton: true,
        confirmButtonText: "YES, DELETE",
        cancelButtonText: "CANCEL",
        icon: "warning"
    }).then((respuesta) => {
        if (respuesta.isConfirmed) {
            listas = [];
            tableBody.textContent = "";
            localStorage.clear();
        } else {
            console.log("no elimino");
        }
    });
};