/*
1. Pedirle al usuario la fecha del día
2. Preguntarle cuántas tareas quiere ingresar
    // 2.1 Ingresar cada tarea
3. Preguntarle si quiere 1.agregar, 2.eliminar o 3.finalizar alguna tarea (1, 2 o 3)
    3.1 (2) Mostrarle las tareas que ingresó y pedirle que elimine una, seleccionando el número de ésta. Después seguir preguntandole el paso 3, hasta que ponga (NO).
    3.2 (1) Dejarle ingresar otra tarea
    3.3 (3) Paso 4
4. Mostrale la fecha y debajo, todas las tarea
*/
class Tarea{
    constructor(prioridad, descripcion){
        this.prioridad= prioridad;
        this.descripcion = descripcion;
    }
}

let fechaA = parseInt(prompt("Ingrese día (sólo número)"));
fechaA = fechaVal1(fechaA);

let fechaB = parseInt(prompt("Ingrese mes (sólo número de hasta dos dígitos)"));
fechaB = fechaVal2(fechaB);

let fechaC = parseInt(prompt("Ingrese año (sólo número de cuatro dígitos)"));
fechaC = fechaVal3(fechaC);


function numeroVal(numero) {
    while (numero <= 0 || isNaN(numero)) {
        numero = parseInt(prompt("Número invalido, ingrese nuevamente un número"))
    }
    return numero;
}

function fechaVal1(fecha1) {
    while (fecha1 <= 0 || fecha1 >= 32 || isNaN(fecha1)) {
        fecha1 = parseInt(prompt("Número invalido, ingrese nuevamente un día"))
    }
    return fecha1;
}

function fechaVal2(fecha2) {
    while (fecha2 <= 0 || fecha2 >= 13 || isNaN(fecha2)) {
        fecha2 = parseInt(prompt("Número invalido, ingrese nuevamente un mes"))
    }
    return fecha2;
}

function fechaVal3(fecha3) {
    while (fecha3 <= 2021 || fecha3 >= 2030 || isNaN(fecha3)) {
        fecha3 = parseInt(prompt("Número invalido, ingrese nuevamente un año"))
    }
    return fecha3;
}

function valPrioridad (orden){
    while (orden <= 0 || orden >= 11 || isNaN(orden)){
        orden = parseInt(prompt("Número incorrecto, ingrese un número válido"))
    }
    return orden;
}

let prio;
let desc;
let cantidad;
let tareas = [];

function ingresarTarea() {
    cantidad = parseInt(prompt("Ingrese la cantidad de tareas que desea"))
    cantidad = numeroVal(cantidad)
    for (let i = 1; i <= cantidad; i++) {
        prio = parseInt(prompt("Ingrese prioridad de la tarea número " + i + "\nDel 1 al 10; 1 siendo la mas importante"))
        prio = valPrioridad(prio)
        desc = prompt("Ingrese descripción de la tarea número " + i)
        let tarea = new Tarea(prio, desc)
        tareas.push(tarea);
    }
    console.table(tareas)
}

function buscarTarea(valor){
    for(item of tareas){
        if(item.descripcion == valor){
            return item
        }
    }
    return false
}

let eliminar; 

function eliminarTarea() {
    let nuevasTareas = [];
    let valor = prompt(concatenarLista()+ "\nEscriba la tarea quiere eliminar")
    let buscador = buscarTarea(valor)
    if(buscador == false){
        alert("No se encontró tarea")
    }else{
        eliminar = tareas.indexOf(buscador);
        // copia toda la lista tareas en nuevasTareas, excepto cuando tenga el valor que quiere eliminar 
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i] == buscador) {
                continue
            }
            nuevasTareas.push(tareas[i]);
        }
        tareas = nuevasTareas;
    }
}

function concatenarLista(){
    let cadena = "";
    for(item of tareas){
        cadena = cadena + item.descripcion + "\n"
    }
    return cadena
}
const operaciones = [
    "1.Ingresar otra tarea\n",
    "2.Eliminar tarea\n",
    "3.Finalizar\n"
];


let operacionSeleccionada
let lista = " ";
operaciones.forEach((opcion) => {
    lista += opcion;
}
);

let inicio = true;
let inicio2 = true;
let pregunta = true;
let listadoTareas = " ";

do {
    if (inicio != false) {
        ingresarTarea()
        alert("Sus tareas para el día: " + fechaA + "/" + fechaB + "/" + fechaC + " son:\n" +concatenarLista());
        inicio = false
    } else if (inicio2 != false) {
        operacionSeleccionada = parseInt(prompt("Seleccione una opción:\n" +lista));
        operacionSeleccionada = numeroVal(operacionSeleccionada);
        switch (operacionSeleccionada) {
            case 1:
                ingresarTarea()
                alert("Sus tareas para el día: " + fechaA + "/" + fechaB + "/" + fechaC + " son:\n" +concatenarLista());
                break;
            case 2:
                eliminarTarea()
                alert("Sus tareas para el día: " + fechaA + "/" + fechaB + "/" + fechaC + "/" + "son:\n" +concatenarLista());
                break;
            default:
                alert("Gracias!\n Sus tareas para el día: " + fechaA + "/" + fechaB + "/" + fechaC + " son:\n" +concatenarLista());
                pregunta = false
        }
    }
} while (pregunta == true)


