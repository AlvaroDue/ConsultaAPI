var contenedor = document.getElementById("container");
var siguiente = document.getElementById("next");
var anterior = document.getElementById("prev");
  

var data = []; //variable hecha global para utilizarla en otras funciones
async function pokemon(path) {
    //Para obtener los datos se debe hacer el fetch en URL
    let rawPersonajes = await fetch(path)
    //Luego se debe parsear para volverlo JSON
    let personajes = await rawPersonajes.json()  

    data = personajes;//Se establece una variable para hacerla global y poder consultarla afuera
   //Ya que se tienen los datos con el map se itera y se mapean todos los objetos que contiene
   personajes.results.map((personaje) => {
       
       var {name, url} = personaje;
       

        rawForms = "https://pokeapi.co/api/v2/pokemon-species/" + name;//Para obtener las imágenes de los pokemones agregando el nombre a la URL y obtener más información
           fetch(rawForms)  
           .then(function(response){                    
               response.json()
               .then(function(poke){
                   realid = poke.id;
                       if (realid < 10) {
                           id="00" + realid;
                       } else if (realid >= 10 && realid < 100) {
                           id = "0" + realid;
                       } else {
                           id = realid;
                       }
                    //Se construyen las cajas de información
                   contenedor.innerHTML += `<div class="box"><div class="thumb"><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png"/></div><div class="info"><h3>${poke.name}</h3><p>descripción: ${poke.flavor_text_entries[3].flavor_text}</p><p>habitat: ${poke.habitat.name}</p><p>forma: ${poke.shape.name}</p></div></div>`
                       
               })                    
           }) 
   });     
   pagination()//Al finalizar las acciones se corre esta función para hacer la paginación
}
//URL de la API
pokemon("https://pokeapi.co/api/v2/pokemon/")

function pagination() {
    next = data.next;//con la variable global obtengo el enlace de la siguente página y la guardo en una variable
    prev = data.previous;
    
    siguiente.setAttribute("onclick","sig();");//Le pego un onclick para que corra la función sig() la cual sirve para pegar el nuevo enlace 
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