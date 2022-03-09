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

const input = document.querySelector("input");
const ul = document.querySelector("ul");
const boton = document.querySelector("#botonSubmit");

    boton.addEventListener("click", () => {
        const text = input.value;

        const li = document.createElement("li");        
        const p = document.createElement("p");
        
        p.textContent = text;
        
        li.appendChild(p); 
        li.appendChild(trashButton());
        ul.appendChild(li);

        input.value = " ";
    });
    

    function trashButton () {
        const button = document.createElement("button");
        button.className = ("delete");
        
        button.innerHTML = 
        '<i class="fas fa-trash"></i>'

        button.addEventListener("click", (e)=> {
            const item = e.target.parentElement;
            ul.removeChild(item);
        });
        return button;
    }
