const plantas = [];

class productos {
    constructor(nombre, precio, img, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = cantidad;
    }
    mostrarPrecio() {
        console.log(`${this.nombre}: $${this.precio}`);
    }
}

const planta1 = new productos("Potus", 1500, "./assets/img/img1.webp", 1);
const planta2 = new productos("Monstera", 7800, "./assets/img/img2.webp", 1);
const planta3 = new productos("Menta", 700, "./assets/img/img4.webp", 1);
const planta4 = new productos("Ficus", 9800, "./assets/img/img3.webp", 1);

plantas.push(planta1, planta2, planta3, planta4);

console.log(plantas);

const contenedorCards = document.querySelector('.containerCard');

plantas.forEach(planta => {
    contenedorCards.innerHTML += `<div class="card">
        <img src="${planta.img}" width="400" alt="" />
        <h3>${planta.nombre}</h3>
        <p>${planta.precio}</p>
        <button class="btn-agregar-carrito">Agregar al carrito</button>
    </div>`;
});

// Carrito de compras
const btnAgregarCarrito = document.querySelectorAll('.btn-agregar-carrito');
const contenedorTBody = document.getElementById('id-t-body');

let carrito = [];
let totalTotal = document.getElementById("totalTotal"); 

contenedorCards.addEventListener("click", e => {
    if (e.target.classList.contains('btn-agregar-carrito')) {
        const product = e.target.parentElement;
        const infoProduct = {
            cantidad: 1,
            nombre: product.querySelector('h3').textContent,
            precio: product.querySelector('p').textContent
        };

        const exits = carrito.some(product => product.nombre === infoProduct.nombre);

        if (exits) {
            carrito = carrito.map(product => {
                if (product.nombre === infoProduct.nombre) {
                    product.cantidad++;
                }
                return product;
            });
        } else {
            carrito.push(infoProduct);
        }

        mostrarEnHTML();
    }
});

const mostrarEnHTML = () => {
    contenedorTBody.innerHTML = ``;

    
    let total = 0;
    carrito.forEach(product => {
        const containerProduct = document.createElement('tr');
        containerProduct.classList.add('cart-product');

        let subtotal = product.precio * product.cantidad; 

        total += subtotal; 

        containerProduct.innerHTML = `<td>
           <div class="producto-C">
             <p id="nombrePlanta">${product.nombre}</p>
           </div>
         </td>
         <td id="precio">$${product.precio}</td>
         <td>
           <div class="cantidad-C" id="containerCantidad">
             <button class="btn-popup" id="menos">-</button>
              <p id="cantidad">${product.cantidad}</p>
             <button class="btn-popup" id="mas">+</button>
           </div>
         </td>
         <td id="subtotal">${subtotal}</td> <!-- Muestra el subtotal para este producto --> 
         <td> 
           <button class="borrar-C" id="borrar" >&#128465;</button>
         </td>
           `;
                    //ARRIBA MUESTRA SUB TOTAL EN CARRITO
        
        contenedorTBody.append(containerProduct);

        containerProduct.querySelector("#menos").addEventListener("click", () => {
            if (product.cantidad > 1) {
                product.cantidad--;
                mostrarEnHTML();
            }
        });

        containerProduct.querySelector("#mas").addEventListener("click", () => {
            product.cantidad++;
            mostrarEnHTML();
        });

        containerProduct.querySelector("#borrar").addEventListener("click", () => {
            borrarProducto(product.nombre);
        });

       // let sumaCantidad = document.getElementById("sumaCantidad");
       // sumaCantidad.textContent = product.cantidad

    });

    

   

        const totalCarrito = document.getElementById('total'); 
            totalCarrito.textContent = `$${total}`;
             submenuContent.style.display = "block";
    
};

// Función para borrar un producto
const borrarProducto = (nombreProducto) => {
    carrito = carrito.filter(product => product.nombre !== nombreProducto);
    mostrarEnHTML();
};

