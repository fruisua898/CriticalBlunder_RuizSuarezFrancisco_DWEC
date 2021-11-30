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
    if (rowtabla>2){
        monstruos()
    }
    for (let i = 0; i < data.results.length; i++) {
        var tr = document.createElement("tr");
        tabla.appendChild(tr);
        var td = document.createElement("td");
        td.innerHTML = data.results[i].name;
        tabla.appendChild(td);
        td.id = data.results[i].name;
        var td = document.createElement("td");
        td.innerHTML = data.results[i].type;
        td.classList.add(data.results[i].type);
        tabla.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = data.results[i].challenge_rating;
        tabla.appendChild(td);
    }
}

/*Busquedas*/

/* --- FILTRO DE BUSQUEDA - MONSTRUOS  --- */

function busqueda_monstruo() {
    let src = document.getElementById("monster-campaign-values").value;
    let name = document.getElementById("monster-campaign-name").value;
    monstruos();
    fetch('https://api.open5e.com/monsters/?search='+name+'&document__slug='+src)
        .then(monstruos => monstruos.json())
        .then(data => mostrar_monstruos(data));
    monstruos(); //Si no recibimos nada muestra el sitio donde estamos.
}





function recoleccion_monstruos_nombre() {
    monstruos();
    fetch('https://api.open5e.com/monsters/?limit=555&ordering=name')
        .then(monstruos => monstruos.json())
        .then(data => mostrar_monstruos(data));
}
function recoleccion_monstruos_type() {
    monstruos();
    fetch('https://api.open5e.com/monsters/?limit=555&ordering=type')
        .then(monstruos => monstruos.json())
        .then(data => mostrar_monstruos(data));
}
function recoleccion_monstruos_cr() {
    monstruos();
    fetch('https://api.open5e.com/monsters/?limit=555&ordering=challenge_rating')
        .then(monstruos => monstruos.json())
        .then(data => mostrar_monstruos(data));
}
