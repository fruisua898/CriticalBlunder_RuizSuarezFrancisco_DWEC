function mode(modo){
    if(modo==='dia'){
        document.documentElement.style
            .setProperty('--gris-oscuro', 'rgba(182, 174, 159, 1)');

        document.documentElement.style
            .setProperty('--gris-claro', 'rgba(69, 57, 69, 1)');

        document.documentElement.style
            .setProperty('--verde-claro', 'rgba(91, 6, 68, 1)');

        document.documentElement.style
            .setProperty('--azul-oscuro', 'rgba(186, 175, 69, 1)');

        document.documentElement.style
            .setProperty('--gris-oscuro-opa', 'rgba(69, 57, 69, 1)');
    }

    else if(modo==='noche'){
        document.documentElement.style
            .setProperty('--gris-oscuro', 'rgba(73, 81, 96, 1)');

        document.documentElement.style
            .setProperty('--gris-claro', 'rgba(186, 198, 186, 1)');

        document.documentElement.style
            .setProperty('--verde-claro', 'rgba(164, 249, 187, 1)');

        document.documentElement.style
            .setProperty('--azul-oscuro', 'rgba(69, 80, 186, 1)');

        document.documentElement.style
            .setProperty('--gris-oscuro-opa', 'rgba(73, 81, 96, 0.8)');

    }
}
