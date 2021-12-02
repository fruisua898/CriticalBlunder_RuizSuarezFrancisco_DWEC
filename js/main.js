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

function monstruos_detail() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("grid-main--vademecum").innerHTML = this.responseText;
    }
    xhttp.open("GET", "detalle-monstruo.txt", true);
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
        td.onclick = function () {                      //Con esto le pasamos la ID del bicho a otra función
            detalle_monstruo(data.results[i].name,data.results[i].challenge_rating);     //que se encarga de mostrarlo por pantalla*/
        }
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












function detalle_monstruo(monstruo,cr) {
    monstruos_detail();
    fetch('https://api.open5e.com/monsters/?search='+monstruo+'&challenge_rating='+cr)
        .then(monstruo => monstruo.json())
        .then(monster => mostrar_detalle(monster));
}
function mostrar_detalle(monster) {
    let lateral = document.getElementById("detalle-monstruo-print");
    for (let i = 0; i < monster.results.length; i++) {

        var img = document.createElement("img");
        img.className="avatar-detalle-monstruo";
        img.src = 'https://5e.tools/img/MM/'+monster.results[i].name+'.png';
        lateral.appendChild(img)


        var tabla = document.createElement("table");
        tabla.className="tabla-detalles";
        lateral.appendChild(tabla);

        var tr = document.createElement("tr");
        tr.className="nombre";
        tabla.appendChild(tr);

        var td = document.createElement("td");
        td.innerHTML = monster.results[i].name;
        td.colSpan= 6;
        tr.appendChild(td);

        var tr = document.createElement("tr");
        tr.className="tipos";
        tabla.appendChild(tr);

        var td = document.createElement("td");
        td.innerHTML = monster.results[i].size+" "+monster.results[i].type+", "+" "+monster.results[i].alignment;
        if (monster.results[i].subtype){
            td.innerHTML = monster.results[i].size+" "+monster.results[i].type+", "+"( "+monster.results[i].subtype+" )"+" "+monster.results[i].alignment;
            tr.appendChild(td);
        }
        td.colSpan=2;
        td.className="rayote";
        tr.appendChild(td);




        /*var td = document.createElement("td");
        td.rowSpan=2;
        tr.appendChild(td);
        var img = document.createElement("img");
        img.className="avatar-detalle-monstruo";
        img.src = 'https://5e.tools/img/MM/'+monster.results[i].name+'.png'; /* Chapuza, pero la API no me proporciona imagenes */
       /* td.colSpan=2;
        td.rowSpan=4;
        td.appendChild(img);
        */

        /*SUB ATRIBUTOS
            * CA
            * TIPO CA
            * HP
            * DADOS HP
            * MOVEMENT
        * */

        var tr = document.createElement("tr");
        tr.className="ca";
        tabla.appendChild(tr);

        var td = document.createElement("td");
        td.innerHTML ="<a>Armor Class</a>  "+monster.results[i].armor_class+" ("+monster.results[i].armor_desc+")";
        td.colSpan=2;
        tr.appendChild(td);

        var tr = document.createElement("tr");
        tr.className="hp";
        tabla.appendChild(tr);

        var td = document.createElement("td");
        td.innerHTML ="<a>Hit Points</a> "+monster.results[i].hit_points+" ("+monster.results[i].hit_dice+")";
        td.colSpan=2;
        tr.appendChild(td);

        var td = document.createElement("td");

        var tr = document.createElement("tr");
        tr.className="movement";
        tabla.appendChild(tr);

        let movimiento_bicho ="<a>Speed</a> "
        /*Checkeo de los distintos de movimientos, no todos los monstruos vuelan, o no todos nadan.*/
        if (monster.results[i].speed.walk){movimiento_bicho+=(monster.results[i].speed.walk+ " ft");}
        if (monster.results[i].speed.fly){movimiento_bicho+=(", Fly "+monster.results[i].speed.fly+ " ft");}
        if (monster.results[i].speed.swim){movimiento_bicho+=(", Swin "+monster.results[i].speed.swim+ " ft ");}
        td.innerHTML = movimiento_bicho;
        td.colSpan=2;
        td.className="rayote";
        tr.appendChild(td);

        /*ATRIBUTOS
            * STRENGHT
            * DEXTERY
            * CONSTITUTION
            * INTELLIGENCE
            * WISDOM
            * CHARISMA
        * */

        var tr = document.createElement("tr");
        tr.className="stats";
        tabla.appendChild(tr);

        var td = document.createElement("td");
        td.innerHTML ="<a>STR</a>";
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML ="<a>DEX</a>";
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML ="<a>CON</a>";
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML ="<a>INT</a>";
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML ="<a>WIS</a>";
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML ="<a>CHA</a>";
        tr.appendChild(td);


        /*ATRIBUTOS --- Valor numérico + bono
            * STRENGHT
            * DEXTERY
            * CONSTITUTION
            * INTELLIGENCE
            * WISDOM
            * CHARISMA
        * */

        var tr = document.createElement("tr");
        tr.className="stats-base-bonos";
        tabla.appendChild(tr);

        var td = document.createElement("td");
        let fuerza = Math.trunc((monster.results[i].strength-10)/2);
        td.innerHTML =monster.results[i].strength+" (+"+fuerza+") ";
        td.className="rayote";
        tr.appendChild(td);

        var td = document.createElement("td");
        let destreza = Math.trunc((monster.results[i].dexterity-10)/2);
        td.innerHTML =monster.results[i].dexterity+" (+"+destreza+") ";
        td.className="rayote";
        tr.appendChild(td);


        var td = document.createElement("td");
        let constitucion = Math.trunc((monster.results[i].constitution-10)/2);
        td.innerHTML =monster.results[i].constitution+" (+"+constitucion+") ";
        td.className="rayote";
        tr.appendChild(td);

        var td = document.createElement("td");
        let inteligencia = Math.trunc((monster.results[i].intelligence-10)/2);
        td.innerHTML =monster.results[i].intelligence+" (+"+inteligencia+") ";
        td.className="rayote";
        tr.appendChild(td);

        var td = document.createElement("td");
        let sabiduria = Math.trunc((monster.results[i].wisdom-10)/2);
        td.innerHTML =monster.results[i].wisdom+" (+"+sabiduria+") ";
        td.className="rayote";
        tr.appendChild(td);

        var td = document.createElement("td");
        let carisma = Math.trunc((monster.results[i].charisma-10)/2);
        td.innerHTML =monster.results[i].charisma+" (+"+carisma+") ";
        td.className="rayote";
        tr.appendChild(td);

        var tr = document.createElement("tr");
        tr.className="salvaciones";
        tabla.appendChild(tr);

        let str_throw = monster.results[i].strength_save;
        let dex_throw = monster.results[i].dexterity_save;
        let con_throw = monster.results[i].constitution_save;
        let int_throw = monster.results[i].intelligence_save;
        let wis_throw = monster.results[i].wisdom_save;
        let cha_throw = monster.results[i].charisma_save;

        /* Comprobamos que exista algún parametro para hacer las comprobaciones y meter lo correspondiente*/
        if (str_throw || dex_throw || con_throw || int_throw || wis_throw || cha_throw){

            var td = document.createElement("td");
            td.innerHTML ="<a>Saving Throws </a>";
            td.className="rayote";
            tr.appendChild(td);
            tr.appendChild(td);

        if (str_throw){
            var td = document.createElement("td");
            td.innerHTML ="Str "+(str_throw);
            td.className="rayote";
            //td.colSpan=2;
            tr.appendChild(td);
        }

        if (dex_throw){
            var td = document.createElement("td");
            td.innerHTML ="Dex "+(dex_throw);
            td.className="rayote";
            //td.colSpan=2;
            tr.appendChild(td);
        }
        if (con_throw){
            var td = document.createElement("td");
            td.innerHTML ="Con "+(con_throw);
            td.className="rayote";
            //td.colSpan=2;
            tr.appendChild(td);
        }
        if (int_throw){
            var td = document.createElement("td");
            td.innerHTML ="Int "+(int_throw);
            td.className="rayote";
            //td.colSpan=2;
            tr.appendChild(td);
        }

        if (wis_throw){
            var td = document.createElement("td");
            td.innerHTML ="Wis "+(wis_throw);
            td.className="rayote";
            //td.colSpan=2;
            tr.appendChild(td);
        }

        if (cha_throw){
            var td = document.createElement("td");
            td.innerHTML ="Cha "+(cha_throw);
            td.className="rayote";
            //td.colSpan=2;
            tr.appendChild(td);
        }
        }
        /*STR       |       DEX*/
        /*Athletics | Acrobatics, Stealth, */
    }
}












