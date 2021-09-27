//** SE BORRARAN LOS DATOS GUARDADOS EN EL LISTADAGASTOS CADA QUE SE RECARGUE LA PAGINA */

sessionStorage.removeItem("listadaGastos")



// ******************* VARIABLES NULL **********************************//

let montoDelMovimiento = null;

let descripcionDelMovimiento = null;    

let gasto = null;

let totalGastos = null;



// ******************* RECOPILACION DE DATOS USUARIO *******************//


let montoDisponible = parseInt(prompt(`Bienvenido para poder empezar necesitarimos definir de cuantos pesos es tu ingreso mensual luego de impuestos.`));



// let boton = document.getElementById("botonAgregarIngreso");

// let montoDisponible = null;

// boton.addEventListener("click", () => {
//     let montoDisponible = document.getElementById("nuevoIngreso").value
//     // console.log(nuevoIngreso)
//     document.getElementById("sumatoriaIngresos").innerHTML = montoDisponible; 
// })



document.getElementById("sumatoriaIngresos").innerHTML = montoDisponible;



// **************************** ARRAYS *********************************//

let gastos = []; 

// ******************* CLASES *******************//

class Gastos {
    constructor (descripcion,monto,categoria) {
        this.descripcion = descripcion,
        this.monto = monto,
        this.categoria = categoria
    }

    metodo(){
        alert("No es posible registrar numeros negativos.")
    }
}

// ******************* EVENTOS *******************//

// ** AGREGA LOS GASTOS NUEVOS A LISTADO DE GASTOS **//

document.getElementById("boton").onclick = () => {agregarGastoALista()};

function agregarGastoALista() {


    
    descripcionDelMovimiento = document.getElementById('descripcionNuevoGasto').value;

    montoDelMovimiento = parseInt(document.getElementById('montoNuevoGasto').value);
    
    
    function resta (disponible, montoGastado) {
        return disponible - montoGastado
    }
    
    restandoGasto = resta (montoDisponible, montoDelMovimiento)
    
    let categoriaSeleccionada = document.getElementById('selectorDeCategorias').value;

    const gasto = new Gastos (descripcionDelMovimiento, montoDelMovimiento, categoriaSeleccionada)

    gastos.push(gasto);
    
    if (montoDelMovimiento < 0) {
        gasto.metodo();
        gastos.pop();
    }


    let gastosJSON = JSON.stringify(gastos);

    sessionStorage.setItem("listadaGastos", gastosJSON);


    let gastosRecuperadosLS = sessionStorage.getItem("listadaGastos");

    let gastosRevertidosLS = JSON.parse(gastosRecuperadosLS)
    

    let tablaGastos = `<table class="border margin" id="table">
                            <tr class="border">
                                <th class="celdasConTitulos">Categoria</th>    
                                <th class="celdasConTitulos">Descripción</th>
                                <th class="celdasConTitulos">Pesos</th>    
                                <th class="celdasConTitulos">Dolares</th> 
                            </tr>`
    
    for (let i = 0; i < gastosRevertidosLS.length; i++) {
        tablaGastos +=
            `<tr>
                <td class="celdasConDatos">${gastos[i].categoria}</td>
                <td class="celdasConDatos">${gastos[i].descripcion}</td>
                <td class="celdasConDatos">${gastos[i].monto}</td>
                <td class="celdasConDatos">${(gastos[i].monto / parseInt(sessionStorage.getItem("valorDolarBlue"))).toFixed(1)}</td>
            </tr>
            `
    }
 
    tablaGastos += `</table>`
    
    document.getElementById("listaDeGastos").innerHTML = tablaGastos;

    $("#table").hide().html(tablaGastos).fadeIn();
    
    gastos.forEach(elemento => {
        totalGastos += elemento.monto; 
    })
    
    const gastosSumados = document.getElementById("sumatoriaGastos");
    
    gastosSumados.innerText = totalGastos;

    const restante = document.getElementById("restante") 

    const montoRestante = montoDisponible - parseInt(gastosSumados.innerText); 

    restante.innerHTML = montoRestante;

};



// ** AGREGA OPCIONES A LA LISTA DE CATEGORIAS **//

const botonCrearCategoriaNueva = document.getElementById("BotonCrearCategoria");

botonCrearCategoriaNueva.addEventListener("click", () => {
    
    const nombreDeNuevaCategoria = document.getElementById("crearCategoria").value;
    
    const selectorDeCategorias = document.getElementById("selectorDeCategorias") 

    const selectorDeFiltro = document.getElementById("categoria")

    const nuevaOpcion = document.createElement("option")

    const nuevaOpcion2 = document.createElement("option")

    
    if (nombreDeNuevaCategoria == "") {
        // document.getElementById("crearCategoria").className += " noValido"
        alert("Debe escribir el nombre de la nueva categoria antes de pulsar el boton crear.")
    }else{
        
        document.getElementById("crearCategoria").className = "inputsBorderRadios"

        nuevaOpcion.setAttribute("valor", `${nombreDeNuevaCategoria}`)
        nuevaOpcion2.setAttribute("valor", `${nombreDeNuevaCategoria}`)
    
        nuevaOpcion.innerHTML = nombreDeNuevaCategoria;
        nuevaOpcion2.innerHTML = nombreDeNuevaCategoria;
    
        
        selectorDeCategorias.append(nuevaOpcion);
    
        selectorDeFiltro.append(nuevaOpcion2);

    }

})

// ****************** API ***************//

$.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales", function (valores){
    sessionStorage.setItem( "valorDolarBlue", valores[1].casa.venta)
});

// ************** ANIMACIONES **************** //






