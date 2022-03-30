class Lista {
    constructor(descripcion, fecha, hora, estado) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado; 
    }
}

let listas = [];

// busca una tarea que recibe por parametro en el storage
// devuelve boolean si encuentra o no la tarea 
function buscarTarea(valor){
    let valorGuardado = getTareas();
    for(const tarea of valorGuardado){
        if (tarea.descripcion == valor){
            return true; 
        } 
    }
    return false; 
}

function getTareas() { 
    let listaTarea = JSON.parse(localStorage.getItem("tarea"));
    if (listaTarea == null || listaTarea == undefined){
        return []; 
    }
    return listaTarea;
}

function setTareas(lista) {
    localStorage.setItem("tarea", JSON.stringify(lista));
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
    const descripcionInput = document.querySelector("#form1").value;
    const fechaInput = document.querySelector("#date").value;
    const horaInput = document.querySelector("#time").value;

    if (descripcionInput.trim() === "" || fechaInput.trim() === "" || horaInput.trim() === "") {
            Swal.fire({
                title: "CAMPOS INCORRECTOS",
                text: "complete todos los campos para continuar",
                icon: "error"
            });
    } else {
        if (buscarTarea(descripcionInput)){
            Swal.fire({
                title: "TAREA REPETIDA",
                text: "ingrese una tarea diferente",
                icon: "error"
            });
        } else {
            let valoresStorage = getTareas();
            valoresStorage.push(new Lista(`${descripcionInput}`, `${fechaInput}`, `${horaInput}`, false));
            
            setTareas(valoresStorage);
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
        <button id="hecho${tarea.descripcion}" class="btn btn-dark ms-1" type="submit">Finished</button>
        `;

        tr.setAttribute("class", `${tarea.descripcion}`);
        tableBody.appendChild(tr);        
        const btnDone = document.querySelector(`#hecho${tarea.descripcion}`);
        
        btnDone.addEventListener("click", () => {
            tarea.estado= !tarea.estado;
            if (tarea.estado == true) {
                btnDone.innerText = "";
                btnDone.innerText = "Unfinished";

                trDone.setAttribute("style", "text-decoration:line-through");
            } else {
                btnDone.innerText = "";
                btnDone.innerText = "Finished";
                trDone.setAttribute("style", "text-decoration:initial");
            }
            setTareas(listas);
        });

        const trDone = document.querySelector(`.${tarea.descripcion}`); 
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
        title: "DESEA ELIMINAR TODAS LAS TAREAS?",
        showCancelButton: true,
        confirmButtonText: "SI, ELIMINAR",
        cancelButtonText: "CANCELAR",
        icon: "warning"
    }).then((respuesta)=>{
        if (respuesta.isConfirmed){
            listas = [];
            tableBody.textContent = "";
            localStorage.clear();
        }else{
            console.log("no elimino");
        }
    });
};