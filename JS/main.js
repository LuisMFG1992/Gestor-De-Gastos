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





// ** AGREGA LOS GASTOS NUEVOS A LISTADO DE GASTOS **//

document.getElementById("boton").onclick = () => {agregarGastoALista()};

function agregarGastoALista(){
    
    descripcionDelMovimiento = document.getElementById('descripcionNuevoGasto').value;
    
    montoDelMovimiento = parseInt(document.getElementById('montoNuevoGasto').value);
    
    restandoGasto = montoDisponible -  montoDelMovimiento;
    
    let categoriaSeleccionada = document.getElementById('selectorDeCategorias').value;
    
    gasto = {
        descripcion: descripcionDelMovimiento, 
        monto: montoDelMovimiento,
        categoria: categoriaSeleccionada
    }
    
    gastos.push(gasto);

    let gastosJSON = JSON.stringify(gastos);

    sessionStorage.setItem("listadaGastos", gastosJSON);


    let gastosRecuperadosLS = sessionStorage.getItem("listadaGastos");

    let gastosRevertidosLS = JSON.parse(gastosRecuperadosLS)
    

    let tablaGastos = `<table class="border margin">
                            <tr class="border">
                                <th class="celdasConTitulos">Categoria</th>    
                                <th class="celdasConTitulos">Descripción</th>
                                <th class="celdasConTitulos">Monto</th>    
                            </tr>`
    
    for (let i = 0; i < gastosRevertidosLS.length; i++) {
        tablaGastos +=
            `<tr>
                <td class="celdasConDatos">${gastos[i].categoria}</td>
                <td class="celdasConDatos">${gastos[i].descripcion}</td>
                <td class="celdasConDatos">${gastos[i].monto}</td>
            </tr>
            `
    }

    tablaGastos += `</table>`

    document.getElementById("listaDeGastos").innerHTML = tablaGastos;

};



// ** AGREGA OPCIONES A LA LISTA DE CATEGORIAS **//

const botonCrearCategoriaNueva = document.getElementById("BotonCrearCategoria");

botonCrearCategoriaNueva.addEventListener("click", () => {
    
    const nombreDeNuevaCategoria = document.getElementById("crearCategoria").value;
    
    const selectorDeCategorias = document.getElementById("selectorDeCategorias") 


    const nuevaOpcion = document.createElement("option")

    nuevaOpcion.setAttribute("valor", `${nombreDeNuevaCategoria}`)

    nuevaOpcion.innerHTML = nombreDeNuevaCategoria;

    
    selectorDeCategorias.append(nuevaOpcion)

    // const nuevaCategoria = `<option>${nombreDeNuevaCategoria}</option>` 
})

