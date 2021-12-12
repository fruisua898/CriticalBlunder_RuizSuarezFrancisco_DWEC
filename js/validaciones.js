function validacion() {
    correo = document.getElementById("correo").value;
    if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(correo)) ) {
        return false;
    }
}