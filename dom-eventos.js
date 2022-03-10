/////////////////////// DOM DESAFIO ///////////////////////

//lista imprimiendo tareas //////////

// let tabla = document.querySelector("#tabla");

// let cuerpo = document.createElement("tbody");
// let tr;

// tareas.forEach(tarea => {
//     tr = document.createElement("tr");
//     tr.innerHTML =
//         `
//     <th>${tarea.descripcion}</th>
//     <th>${tarea.hora}</th>
//     <th>${tarea.prioridad}</th>
//     `
//     cuerpo.appendChild(tr);
// });

// tabla.appendChild(cuerpo);

// contador de tareas /////////

// let tareasPend = document.querySelector("#pendingTask");

// tareasPend.innerHTML = 
// `You have ${tareas.length} pending tasks`

/////////////////////// EVENTOS CLASE ///////////////////////

// function init (){

// }

// function programarBotones (){
//     programarBotonSubmit();
// }
// function programarBotonSubmit (){
    // boton.onclick = ()=> { }
    // }

    // function programarInput(){
    //     const input = document.querySelector("#inputTarea");
    //     input.addEventListener("focus", (e)=> {
    //         if (e.target.value === "Add your new to-do"){
    //             e.target.value = " ";
    //         }
    //     });
    //     input.addEventListener("blur", (e)=> {
    //         if (e.target.value === " "){
    //             e.target.value = "Add your new to-do";
    //         }
    //     });
    // }

/////////////////////// EVENTOS DESAFIO ///////////////////////


class Dulce {
    constructor(nombre, precio, images) {
        this.nombre = nombre;
        this.precio = precio;
        this.images = images;
    }
}

// declaracion de arrays
// let nuevoDulce;
const dulces = [];
// let carrito = [];
dulces.push(new Dulce("Dos Corazones", 80, "./images/Dos-Corazones.jpg"));
dulces.push(new Dulce("Mogul Gomitas", 60, "./images/Mogul-Gomitas.jpg"));
dulces.push(new Dulce("Ferrero Rocher", 250, "./images/Ferrero-Rocher.jpg"));
dulces.push(new Dulce("Shot Bloque Chocolate", 160, "./images/Shot-Bloque-Chocolate.webp"));
dulces.push(new Dulce("Kinder Chocolate", 255, "./images/Kinder-Chocolate.jpeg"));
dulces.push(new Dulce("Jorgito Alfajor", 85, "./images/Jorgito-Alfajor.jpg"));
dulces.push(new Dulce("Milka Chocolate", 310, "./images/Milka-Chocolate.png"));
dulces.push(new Dulce("Pepitos Alfajor", 150, "./images/Pepitos-Alfajor.jpg"));
dulces.push(new Dulce("Bon o Bon", 55, "./images/Bon-o-Bon.jpg"));


























    class Lista {
        constructor (descripcion, hora, fecha){ 
            this.descripcion = descripcion;
            this.hora = hora; 
            this.fecha = fecha;
        }
    }

    let listas = []; 

    function init(){
        guardarTareaAccion();
    }

    function guardarTareaAccion (){

        const boton = document.querySelector("#botonSubmit");

        boton.addEventListener("click", (e) =>{
            e.preventDefault();

            guardarTarea();
        });
    }

    function guardarTarea(){
        const tareaInput = document.querySelector("#form1").value;
        const horaInput = document.querySelector("#time").value;
        const fechaInput = document.querySelector("#date").value;

        listas.push (new Lista(`${tareaInput}`, `${horaInput}`, `${fechaInput}`));

        if (tareaInput.trim() === "" || horaInput.trim() === "" || fechaInput.trim() === ""){
            tareaInput.value = "";
            horaInput.value = "";
            fechaInput.value = "";
            
            location.reload();
        }else{
            const today = new Date();
            const fechaFormat = fechaInput.split("-"); //split separa mi fecha (2022-03-09), rompiendo el string en los "-" y lo convierte e array 
            const fechaFinal = new Date(fechaFormat[0], fechaFormat[1]-1, fechaFormat[2]); //[0] es el año, [1] es el mes y se le resta 1 porque va de 0 a 11, el [2] es el dia. Por ejemplo, elijo ENERO, entonces es 1-1=0 y 0 es ENERO; si pongo JUNIO es 7-1=6 y 6 es JUNIO. Eso es por el OBJETO DATE. 

            const miliSeg = today.getTime();
            const segFinal = fechaFinal.getTime(); //es mas preciso usar milisegundos para comparacion de fechas.

            if(segFinal < today){
                alert ("ingresa fecha posterior");
            }else {
                crearTable(); 
            } 
        }
    }


    const table = document.querySelector("table");
    const body = document.querySelector("tbody");


    function crearTable(){
        listas.forEach(tarea => {
            let tr = document.createElement("tr");
            tr.innerHTML = 
            `<td>${tarea.descripcion}</td>
            <td>${tarea.hora}</td>
            <td>${tarea.fecha}</td>`;

            body.appendChild(tr);
        }); 
    }
