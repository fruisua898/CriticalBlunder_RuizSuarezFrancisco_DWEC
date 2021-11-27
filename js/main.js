function eleccion_equipo() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("grid-main--vademecum").innerHTML = this.responseText;
    }
    xhttp.open("GET", "monster.txt", true);
    xhttp.send();
}

function monstruos() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("grid-main--vademecum").innerHTML = this.responseText;
    }
    xhttp.open("GET", "monster.txt", true);
    xhttp.send();
}
