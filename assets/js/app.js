var contenedor = document.getElementById("container");
var siguiente = document.getElementById("next");
var anterior = document.getElementById("prev");
  

var data = []; 
async function pokemon(path) {
    
    let rawPersonajes = await fetch(path)
    let personajes = await rawPersonajes.json()  

    data = personajes;

    console.log(data)
   personajes.results.map((personaje) => {
       
       var {name, url} = personaje;

       var numeros = /(\d+(\/\d)*)/g;
       var arrayNums = url.match(numeros);
       var realid = arrayNums[1];

       if (realid < 10) {
                id="00" + realid;
            } else if (realid >= 10 && realid < 100) {
                id = "0" + realid;
            } else {
                id = realid
            }
        
       contenedor.innerHTML += `<div class="box" id="${realid}" onclick="detail(this.id); datos(this.id);"><div class="thumb"><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png"/></div><div class="name"><h3>${name}</h3></div></div>`
       
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

function detail(clickedId) {
    detalle("https://pokeapi.co/api/v2/pokemon-species/" + clickedId)
    
}


async function detalle(path) {
    
    let rawDetalles = await fetch(path)
    let detalles = await rawDetalles.json();
    
    console.log(detalles.flavor_text_entries)

    console.log(detalles.flavor_text_entries[4].flavor_text);

}


function datos(clickedId) {
    dato("https://pokeapi.co/api/v2/pokemon/" + clickedId)
    
}

async function dato(path) {
    
    let rawCaracts = await fetch(path)
    let caract = await rawCaracts.json();
    console.log(`Su id es: ${caract.id} y su habilidad 1 es: ${caract.abilities[0].ability.name}`/*, caract.abilities[1].ability.name*/)
    
    let movimientos = caract.moves;

     for (var i = 0; i < movimientos.length; i++){
         
         console.log(`Movimiento ${i+1} es: ${movimientos[i].move.name}`);
     }


}