class Lista {
    constructor(descripcion, fecha, hora) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
    }
}

let listas = [];


const btnSave = document.querySelector("#botonSubmit");

btnSave.addEventListener("click", (e) => {
    e.preventDefault();
    
    guardarTareas();
});

function guardarTareas() {
    const descripcionInput = document.querySelector("#form1").value;   
    const fechaInput = document.querySelector("#date").value;
    const horaInput = document.querySelector("#time").value;
    
    if (descripcionInput.trim() === "" || fechaInput.trim() === "" || horaInput.trim() === "") {
        alert("COMPLETE TODOS LOS CAMPOS");
    } else {
        listas.push(new Lista(`${descripcionInput}`, `${fechaInput}`, `${horaInput}`));
        imprimirTareas(listas);
    }
    document.getElementById("formulario").reset();
}

function imprimirTareas(listas) {
    const tableBody = document.querySelector("tbody");
    tableBody.textContent = "";
    
    let tr;
    listas.forEach(tarea => {
        tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${tarea.descripcion}</td>
        <td>${tarea.fecha}</td>
        <td>${tarea.hora}</td>
        <button id="${tarea.descripcion}" class="btn btn-danger" type="submit">Delete</button>
        <button id="${tarea.descripcion}" class="btn btn-dark ms-1" type="submit">Finished</button>
        `
        tableBody.appendChild(tr);
        
        const btnEliminarAll = document.querySelector ("#btnDeleteAll");
        btnEliminarAll.onclick = () => {
            tableBody.remove(tr);
        };
        return btnEliminarAll;
    });
    storageTareas();
}

function storageTareas(){
    localStorage.setItem("tarea", JSON.stringify (listas));
}

function storageTareasPrecarga(){
    if (localStorage.getItem("tarea") !== null){ 
        listas = JSON.parse(localStorage.getItem("tarea")); 
    }
}

// storageTareasPrecarga();