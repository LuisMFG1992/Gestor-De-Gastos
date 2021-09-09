//** SE BORRARAN LOS DATOS GUARDADOS EN EL LISTADAGASTOS CADA QUE SE RECARGUE LA PAGINA */

sessionStorage.removeItem("listadaGastos")

// ******************* VARIABLES NULL *******************//

let montoDelMovimiento = null;

let descripcionDelMovimiento = null;

let gasto = null;



// ******************* RECOPILACION DE DATOS USUARIO *******************//

let montoDisponible = parseInt(prompt(`Bienvenido para poder empezar necesitarimos definir de cuantos pesos es tu ingreso mensual luego de impuestos.`));

document.getElementById("sumatoriaIngresos").innerHTML = montoDisponible;



// ******************* ARRAYS *******************//

let gastos = []; 




// ******************* FUNCIONES *******************//





// ******************* EVENTOS *******************//

document.getElementById("boton").onclick = () => {agregarGastoALista()};

function agregarGastoALista(){
    
    descripcionDelMovimiento = document.getElementById('descripcionNuevoGasto').value;
    
    montoDelMovimiento = parseInt(document.getElementById('montoNuevoGasto').value);
    
    restandoGasto = montoDisponible -  montoDelMovimiento;
    
    gasto = {
        descripcion: descripcionDelMovimiento, 
        monto: montoDelMovimiento
    }
    
    gastos.push(gasto);

    let gastosJSON = JSON.stringify(gastos);

    sessionStorage.setItem("listadaGastos", gastosJSON);


    let gastosRecuperadosLS = sessionStorage.getItem("listadaGastos");

    let gastosRevertidosLS = JSON.parse(gastosRecuperadosLS)

    let tablaGastos = `<table class="border">
                            <tr class="border">
                                <th class="celdasConTitulos">Descripción</th>
                                <th class="celdasConTitulos">Monto</th>    
                            </tr>`
    
    for (let i = 0; i < gastosRevertidosLS.length; i++) {
        tablaGastos +=
            `<tr>
                <td class="celdasConDatos">${gastos[i].descripcion}</td>
                <td class="celdasConDatos">${gastos[i].monto}</td>
            </tr>
            `
    }

    tablaGastos += `</table>`

    document.getElementById("listaDeGastos").innerHTML = tablaGastos;

};
