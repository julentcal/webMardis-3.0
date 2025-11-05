
const buscarProducto = id => productos.find(p => p.id === id);

let carrito = [];

function precioConIVA(precio = 0, iva= 0.21){
    return precio + (precio * iva);
}



const catbolsos = [
  {id:1, catname:"Eugenia", cattipo: "bolso", info: "Para cada día del año",price: 32},
  {id:2, catname:"Manuela", cattipo: "bolso", info:"El más versátil", price: 30},
  {id:3, catname:"Pepita", cattipo: "bolso", info:"Un toque más moderno", price: 32},
  {id:4, catname:"Valeria", cattipo: "bolso", info:"Perfecto para bodas", price: 30},
  {id:5, catname:"Carlota", cattipo: "bolso", info:"Para cualquier evento", price: 30},
  {id:6, catname:"Julieta", cattipo: "bolso", info:"Modelo japonés", price: 35},
];


const catcomple = [
  {id:1, catname:"Choker Flor", cattipo: "comple", info:"Un toque especial", price: 8},
  {id:2, catname:"Choker Pétalos", cattipo: "comple", info:"Eleva tu look", price: 10},
  {id:3, catname:"Pendientes simples", cattipo: "comple", info:"El más versátil", price: 10},
  {id:4, catname:"Pendientes dobles", cattipo: "comple", info:"Para las más atrevidas", price: 12},
  {id:5, catname:"Coletero", cattipo: "comple", info:"Complemento diario ideal ", price: 9},
  {id:6, catname:"Puños", cattipo: "comple", info:"Dale un toque a tu blazer", price: 25},
];


const clientas = [
    {id:1, name:"María López", img:"./img/bmanu.jpg", comment:'"Me encanta mi bolso Manuela, es perfecto para cualquier ocasión."'},
    {id:2, name:"Ana García", img:"./img/pbit.jpg", comment:'"Luciendo mis pendientes y bolso Pepita por Italia."'},
    {id:3, name:"Lucía Fernández", img:"./img/beu.jpg", comment:'"El bolso Eugenia en marrón es súper ponible y me encanta!!"'},
];


//creamos cards de bolsos
const catalogob = document.querySelector("#catbolsos");

for (const b of catalogob){
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `
    <h3>${b.name}</h4>
    <p>${b.info}</p>
    <p class="price">${b.price}</p>
    <button class="btn" data-id="${b.id}">Añadir</button>
    `;
  catalogob.appendChild(card);
}
const gridb = document.querySelector("#gridBolsos");

gridb.addEventListener("click", (eb) => {
  const btn = eb.target.closest('button[data-id]');
  if (!btn) return;
  const id = +btn.dataset.id;
  agregarb(id);
});


//creamos cards de complementos
const catalogoc = document.querySelector("#catcomple");

for (const c of catalogoc){
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `
    <h3>${c.name}</h4>
    <p>${c.info}</p>
    <p class="price">${c.price}</p>
    <button class="btn" data-id="${c.id}">Añadir</button>    
  `;
  catalogoc.appendChild(card);
}

const gridc = document.querySelector("#gridComple");

gridc.addEventListener("click", (ec) => {
  const btn = ec.target.closest('button[data-id]');
  if (!btn) return;
  const id = +btn.dataset.id;
  agregarc(id);
});


//creamos cards de clientas
const clienta = document.querySelector("#clientas");

for (const t of clienta){
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `
    <h3>${t.name}</h4>
    <p>${t.info}</p>
    <img src="${t.img}" alt="Foto de ${t.name}">
    <p class="comment">${t.comment}</p>    
  `;
  catalogoc.appendChild(card);
};


document.querySelector("#btnVaciar").addEventListener("click", () =>{
    carrito = [];             // vaciar array
    dibujarCarrito(carrito);  // refrescar UI
});

function agregar(idProducto){
    const p = buscarProducto(idProducto); // busca en catálogo
    if (!p) return;

    const linea = carrito.find(l => l.id === idProducto);
    if (linea){
        // ya existe: aumentar cantidad y recalcular subtotal
        linea.cantidad += 1;
        linea.subtotal = +(linea.cantidad * p.precio).toFixed(2);
    } else {
        // no existe: crear nueva línea
        carrito.push({ id: p.id, nombre: p.nombre, cantidad: 1, subtotal: +p.precio.toFixed(2) });
    }
    dibujarCarrito(carrito); // actualizar la vista
}


// Formateo de importe a euros con 2 decimales
function aEuros(importe) {
    return `${importe.toFixed(2)} €`;
}


// Pintar el carrito en la interfaz
function dibujarCarrito(lineas = []){
    const ulCarrito = document.querySelector("#listaCarrito");
    const txtTotal  = document.querySelector("#txtTotal");
    const txtUds    = document.querySelector("#txtUnidades");

    // 1) limpiar el listado
    ulCarrito.innerHTML = "";
    let tUnidades = 0;
    let tImporte = 0;

    // 2) recorrer líneas y construir <li> por cada una
    for (const l of lineas) {
       const li = document.createElement("li");
       li.textContent = ` ${l.nombre} - ${l.cantidad} uds - ${aEuros(l.subtotal)}`;
       ulCarrito.appendChild(li);

       tUnidades += l.cantidad;
       tImporte += l.subtotal; 
    }

    // 3) actualizar totales (unidades y total con IVA)
    txtUds.textContent = `${tUnidades} ud`;
    txtTotal.textContent = aEuros(precioConIVA(tImporte));
}