/* Overlay asincrono para la estructura de equipamiento */

function eleccion_equipo() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("grid-main--vademecum").innerHTML = this.responseText;
    }
    xhttp.open("GET", "items.txt", true);
    xhttp.send();
}


/* Overlay asincrono para la estructura de monstruos */

function monstruos() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("grid-main--vademecum").innerHTML = this.responseText;
    }
    xhttp.open("GET", "monsters.txt", true);
    xhttp.send();

}

/* Función que imprime los monstruos en pantalla */

function mostrar_monstruos(data){
    let tabla = document.getElementById("escribir-monstruos");
    const rowtabla = tabla.childElementCount;
    let contador = 0;
    if (rowtabla>2){
        monstruos()
    }
    for (let i = 0; i < data.results.length; i++) {
        contador+=1;
        var tr = document.createElement("tr");
        tabla.appendChild(tr);
        var td = document.createElement("td");
        td.innerHTML = data.results[i].name;
        tr.appendChild(td);
        td.id = data.results[i].name;
        var td = document.createElement("td");
        td.innerHTML = data.results[i].type;
        tr.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = data.results[i].challenge_rating;
        tr.appendChild(td);
    }
    var tr = document.createElement("tr");
    tabla.appendChild(tr);
    var legend = document.createElement("legend");
    legend.innerHTML = contador+" coincidencias encontradas";
    tabla.appendChild(legend);
}

/*Busquedas*/

/* --- FILTRO DE BUSQUEDA - MONSTRUOS  --- */


// Evito el refresh del formulario, al hacer submit su comportamiento por defecto es hacer un refresh.

function prevent_refresh(){
    document.getElementById("filtro-vad-monster").addEventListener("submit", function(event){
        event.preventDefault()})
}


function busqueda_monstruo() {

    let src = document.getElementById("monster-campaign-values").value;
    let name = document.getElementById("monster-campaign-name").value;
    monstruos();
    fetch('https://api.open5e.com/monsters/?limit=1086&search='+name+'&document__slug='+src)
        .then(monstruos => monstruos.json())
        .then(data => mostrar_monstruos(data));
    monstruos(); //Si no recibimos nada muestra el sitio donde estamos.
}



/* Ordenar según criterio
*   Nombre
*   Tipo
*   CR
* */
function recoleccion_monstruos_nombre() {
    monstruos();
    fetch('https://api.open5e.com/monsters/?limit=1086&ordering=name')
        .then(monstruos => monstruos.json())
        .then(data => mostrar_monstruos(data));
}
function recoleccion_monstruos_type() {
    monstruos();
    fetch('https://api.open5e.com/monsters/?limit=1086&ordering=type')
        .then(monstruos => monstruos.json())
        .then(data => mostrar_monstruos(data));
}
function recoleccion_monstruos_cr() {
    monstruos();
    fetch('https://api.open5e.com/monsters/?limit=555&ordering=challenge_rating')
        .then(monstruos => monstruos.json())
        .then(data => mostrar_monstruos(data));
}
