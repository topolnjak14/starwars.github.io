//Creo mi objeto (Molde) con las peliculas que quiero que tenga mi web

class Pelicula {
    constructor(id, nombre, episodio, lanzamiento, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.episodio = episodio;
        this.lanzamiento = lanzamiento;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;  //IMPORTANTE!
        }
}

const episodioCuatro = new Pelicula(1, "Una nueva esperanza", "IV", 1977, 950, "./assets/imgIV.jpg");
const episodioCinco = new Pelicula(2, "El imperio contraataca", "V", 1980, 1200, "./assets/imgV.webp" );
const episodioSeis = new Pelicula(3, "El retorno del Jedi", "VI", 1983, 830, "./assets/imgVI.jpg" );
const episodioUno = new Pelicula(4, "La amenaza fantasma", "I", 1999, 970, "./assets/imgI.jpg" );
const episodioDos = new Pelicula(5, "El ataque de los clones", "II", 2002, 1000, "./assets/imgII.jpg " );
const episodioTres = new Pelicula(6, "La venganza de los Sith", "III", 2005, 1120, "./assets/imgIII.jpg" );
const episodioDespertar = new Pelicula(7, "El despertar de la fuerza", "VII", 2015, 820, "./assets/imgVII.jpg" );
const episodioRogue = new Pelicula(8, "Rogue One", "Un nuevo Jedi", 2016, 875, "./assets/imgRogue.webp" );
const episodioOcho = new Pelicula(9, "El ultimo Jedi", "VIII", 2017, 930, "./assets/imgLast.jpg" );
const episodioNueve = new Pelicula(10, "El despertar de la fuerza", "IX", 2019, 950, "./assets/imgRise.jpeg" );



//Ahora procedo a crear un array con todas las pelis

const peliculas = [episodioCuatro, episodioCinco, episodioSeis,
episodioUno, episodioDos, episodioTres, episodioDespertar, episodioRogue, episodioOcho, episodioNueve];



//Procedo a crear el carrito donde almacenare las compras

let carrito = [];  //Vacio porque inicialmente no hay productos, se van llenando dinamicamente


/*CARGAR CARRITO DESDE EL LOCAL STORAGE (Esto fue casi lo ultimo que hice) */

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


//Ahora se viene la magia modificando el DOM para mostrar esos productos


const contenedor = document.getElementById("contenedor"); //Con eso vinculo el container

// Creo una funcion para mostrar las peliculas:

const mostrarPeliculas = () => {
    peliculas.forEach(pelicula => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12"); 
        card.innerHTML = `
        <div class="card mx-auto " style="width: 18rem;">
           
            <img src="${pelicula.img}" class="card-img-top imgPeliculas" alt="${pelicula.nombre}">

            <div class="card-body text-center">
                <h5 class="card-title"> ${pelicula.nombre}</h5>
                <h5 class="card-title"> Episodio ${pelicula.episodio}</h5>
                <h5 class="card-title"> Año: ${pelicula.lanzamiento}</h5>
                <p class="card-text"> $${pelicula.precio} </p>
                <button class="btn fw-bold botonEstilo" id="boton ${pelicula.id}">Agregar al carrito</button>
            </div>

        </div>
        `
        contenedor.appendChild(card);

        //Aprovecho y agrego los productos al carrito (paso posterior)
        const boton = document.getElementById(`boton ${pelicula.id}`);
        boton.addEventListener("click", () => {
            agregarCarrito(pelicula.id)
        })
    })
}

mostrarPeliculas()
 




//Creo una funcion para agregar las peliculas al carrito

const agregarCarrito = (id) => {
    const pelicula = peliculas.find((pelicula) => pelicula.id === id);
    const peliculaEnCarrito = carrito.find((pelicula) => pelicula.id === id);
    
    if (peliculaEnCarrito) {
        peliculaEnCarrito.cantidad++; //para que le sume 1
    } else {
        carrito.push(pelicula);
        

        localStorage.setItem("carrito", JSON.stringify(carrito));
        
    }
    calcular();
}


//Eventos para el carrito

const contenedorCarrito = document.getElementById("carritoForever");

const verCarrito = document.getElementById("verCarrito1");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


//Funcion para Mostrar el carrito

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML=""; 
    carrito.forEach((pelicula) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card">

            <div class="card-body row text-start fondoDark">
                <img src="${pelicula.img}" class="card-img-top " alt="${pelicula.nombre}">
                <h5 class="card-title">${pelicula.nombre}</h5>
                <p class="card-text">Precio: $${pelicula.precio} </p>
                <p class="card-text">Cantidad: ${pelicula.cantidad} </p>
                <button class="btn botonEstilo" id="eliminar ${pelicula.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3 text-center"  id="eliminar ${pelicula.id} viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg></button>
            
            </div>
        </div>
        `
        contenedorCarrito.appendChild(card);

        //Eliminar producto del carrito

        const boton = document.getElementById(`eliminar ${pelicula.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(peliculas.id);
        })
        
    })
    calcular();

}



//Funcion para eliminar la pelicula del carrito

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((pelicula) => pelicula.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //Aca tamb podemos trabajar con el local storage
    localStorage.setItem("carrito", JSON.stringify(carrito));

}


//Funcion para vaciar todo el carrito de compras

const VaciarCarrito = document.getElementById("VaciarCarrito");

VaciarCarrito.addEventListener("click", () => {
    eliminarTodo();
})

const eliminarTodo = () => {
    carrito = [];
    mostrarCarrito();

    //Vaciamos el localStorage

    localStorage.clear();
}


//Mostramos el total de la compra

const total = document.getElementById("total");

//Creamos una funcion que suma los precios y modifica el span

const calcular = () => {
    let totalCompra = 0;
    carrito.forEach((peliculas) => {
        totalCompra += peliculas.precio * peliculas.cantidad;
    })

    total.innerHTML = `Total: $${totalCompra}`;
}



/* USO DE UN JSON CON FETCH PARA MOSTRAR ALGUNOS PERSONAJES */
    
const contenedorDos = document.getElementById("contenedorDos");

function cargarJson() {
    fetch("objetos.json")

    .then(function(res) {
        return res.json();
    })

    .then (function (peliculas){
        peliculas.forEach((pelicula) => {
            const card = document.createElement("div");
            card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
            card.innerHTML += `
            <div class="card mx-auto" style="width: 18rem;">
                <img src="${pelicula.img}" class="card-img-top imgPeliculas" alt="${pelicula.nombre}">
    
                <div class="card-body text-center fw-bold">
                    <h5 class="card-title"> ${pelicula.nombre}</h5>
                    <p class="card-title"> Edad: ${pelicula.edad}</p>
                    <p class="card-title"> Estatura: ${pelicula.estatura} cm</p>
                    <p class="card-text"> Hogar: ${pelicula.hogar} </p>
                    
                </div>
            </div>
            `
        contenedorDos.appendChild(card);
        })      
        })
    
        .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
    

}


cargarJson();

    
    
 //Para reservar 

 const reserva = document.getElementById("Reservar");



if (carrito) {
    reserva.addEventListener("click", () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu reserva se realizó con éxito',
            showConfirmButton: false,
            timer: 1500
          })
    })
}




/* const bdark = document.getElementById("bdark");
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const button = document.querySelector("button");


    bdark.addEventListener("click", e => {
        body.classList.toggle("darkmode"); 
        nav.classList.toggle("darkmode");
        button.classList.toggle("darkmode"); 
       
    });
     */


    const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	btnSwitch.classList.toggle('active');

	// Guardamos el modo en localstorage.
	if(document.body.classList.contains('dark')){
		localStorage.setItem('dark-mode', 'true');
	} else {
		localStorage.setItem('dark-mode', 'false');
	}
});

// Obtenemos el modo actual.
if(localStorage.getItem('dark-mode') === 'true'){
	document.body.classList.add('dark');
	btnSwitch.classList.add('active');
} else {
	document.body.classList.remove('dark');
	btnSwitch.classList.remove('active');
}
 










