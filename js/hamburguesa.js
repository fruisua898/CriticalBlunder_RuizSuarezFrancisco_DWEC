function menu_movil() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("header-desplegable").innerHTML = this.responseText;
    }
    xhttp.open("GET", "menu-overlay.txt", true);
    xhttp.send();
}


function back_menu(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("header-desplegable").innerHTML = this.responseText;
    }
    xhttp.open("GET", "menu-overlay-normal.txt", true);
    xhttp.send();
}
