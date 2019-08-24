var contenedor = document.getElementById("container");
var contenedorDetalle = document.getElementById("containerDetail");
var siguiente = document.getElementById("next");
var anterior = document.getElementById("prev");
var botones = document.getElementsByTagName("a");
var cierre = document.getElementById("close");
  

var data = [];
var current = ""; 

async function pokemon(path) {
    
    let rawPersonajes = await fetch(path)
    let personajes = await rawPersonajes.json()  

    data = personajes;
    current = path;
   personajes.results.map((personaje) => {
       
       var {name, url} = personaje;

       var numeros = /(\d+(\/\d)*)/g;
       var arrayNums = url.match(numeros);
       var realid = arrayNums[1];    
        
       contenedor.innerHTML += `<div class="box" id="${realid}" onclick="detail(this.id); datos(this.id);"><div class="thumb"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${realid}.png"/></div><div class="name"><h3>${name}</h3></div></div>`
       
   });     
   pagination()
}

pokemon("https://pokeapi.co/api/v2/pokemon/")

function pagination() {
    next = data.next;
    prev = data.previous;
    
    siguiente.setAttribute("onclick","sig();");
    anterior.setAttribute("onclick","ant();");    
}

var next;
var prev;

function sig() {  
    clear()       
    pokemon(next)      
}

function ant() { 
    clear()       
    pokemon(prev)    
}

function clear() {
    contenedor.innerHTML = "";
}

function clearDetail() {
    contenedorDetalle.innerHTML = "";
}

function disapear() {
    
    for(var i = 0; i < botones.length; i++){
        botones[i].style.display = "none"; 
    }
}

function reapear() {
    for(var i = 0; i < botones.length; i++){
        botones[i].style.display = "inline-block"; 
    }
}

function detail(clickedId) {
    clear()
    detalle("https://pokeapi.co/api/v2/pokemon-species/" + clickedId)
    disapear()
    cierre.style.display = "block";
    
}


async function detalle(path) {
    
    let rawDetalles = await fetch(path)
    let detalles = await rawDetalles.json();
    
    var realid = detalles.id;

    if (realid < 10) {
        id="00" + realid;
    } else if (realid >= 10 && realid < 100) {
        id = "0" + realid;
    } else {
        id = realid
    }
    
    var cantDesc = detalles.flavor_text_entries.length;
    /* 74  4, 14, 31
    54  3, 19, 27
    64  4, 13, 29 */ 
    
    
    if (cantDesc === 54) {
        descriptionOne = detalles.flavor_text_entries[3].flavor_text;
        descriptionTwo = detalles.flavor_text_entries[19].flavor_text;
        descriptionThree = detalles.flavor_text_entries[27].flavor_text;
    } else if (cantDesc === 64) {
        descriptionOne = detalles.flavor_text_entries[4].flavor_text;
        descriptionTwo = detalles.flavor_text_entries[13].flavor_text;
        descriptionThree = detalles.flavor_text_entries[29].flavor_text;
    } else if (cantDesc === 74) {
        descriptionOne = detalles.flavor_text_entries[4].flavor_text;
        descriptionTwo = detalles.flavor_text_entries[14].flavor_text;
        descriptionThree = detalles.flavor_text_entries[31].flavor_text;
    }

    contenedorDetalle.innerHTML += `<div><h3>${detalles.name}</h3><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png"><p>Descripción:</p><p>${descriptionOne}</p><p>${descriptionTwo}</p><p>${descriptionThree}</p><p>Hábitat: ${detalles.habitat.name}</p><p>Forma: ${detalles.shape.name}</p></div>`
      

}


function datos(clickedId) {
    clear()
    dato("https://pokeapi.co/api/v2/pokemon/" + clickedId)
    cierre.style.display = "block";
    
}

async function dato(path) {
    
    let rawCaracts = await fetch(path)
    let caract = await rawCaracts.json();

    var numTipos = caract.types.length;

    if (numTipos === 1) {
        tipos = caract.types[0].type.name;
    } else (
        tipos = `${caract.types[0].type.name} / ${caract.types[1].type.name}`
    )
        console.log(caract.types.length)

    contenedorDetalle.innerHTML += `<p>Tipo: ${tipos}</p><p>Alto: ${caract.height}</p> <p>Peso: ${caract.weight}</p><p>Movimientos: </p>`

    let movimientos = caract.moves;

     for (var i = 0; i < movimientos.length; i++){
        contenedorDetalle.innerHTML += `<span> - ${movimientos[i].move.name}</span>`         
     }

     


}

function cierra() {
    clearDetail()
    pokemon(current)
    reapear()
    cierre.style.display = "none";
}