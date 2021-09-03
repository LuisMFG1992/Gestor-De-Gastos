// ******************* VARIABLES NULL *******************//

let montoDelMovimiento = null;

let descripcionDelMovimiento = null;

let gasto = null;

// let restandoGasto = 0;




// ******************* RECOPILACION DE DATOS USUARIO *******************//

let nombreDelUsuario = prompt("Hola! por favor ingrese su nombre."); 

let montoDisponible = parseInt(prompt(`Bienvenido ${nombreDelUsuario}, para poder empezar necesitarimos definir de cuantos pesos es tu ingreso mensual luego de impuestos.`));

document.getElementById("sumatoriaIngresos").innerHTML = montoDisponible;
// document.getElementById("restante").innerHTML = restandoGasto;




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

    let tablaGastos = `<table class="border">
                            <tr class="border">
                                <th class="celdasConTitulos">Descripción</th>
                                <th class="celdasConTitulos">Monto</th>    
                            </tr>`
    
    for (let i = 0; i < gastos.length; i++) {
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
