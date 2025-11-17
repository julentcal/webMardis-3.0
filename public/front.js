
let carrito = [];

function precioConIVA(precio = 0, iva= 0.21){
    return precio + (precio * iva);
}

const catbolsos = [
  {id:1, nombre:"Eugenia", img:"./img/Eug.jpg", tipo: "bolso", info: "Para cada día del año",precio: 32},
  {id:2, nombre:"Manuela", img:"./img/Man.jpg", tipo: "bolso", info:"El más versátil", precio: 30},
  {id:3, nombre:"Pepita", img:"./img/Pep.jpg", tipo: "bolso", info:"Un toque más moderno", precio: 32},
  {id:4, nombre:"Valeria", img:"./img/Val.jpg", tipo: "bolso", info:"Perfecto para bodas", precio: 30},
  {id:5, nombre:"Carlota", img:"./img/Carl.jpg", tipo: "bolso", info:"Para cualquier evento", precio: 30},
  {id:6, nombre:"Julieta", img:"./img/Juli.jpg", tipo: "bolso", info:"Modelo japonés", precio: 35},
];


const catcomple = [
  {id:7, nombre:"Choker Flor", img:"./img/Imagen de WhatsApp 2025-10-22 a las 09.38.45_5192163e.jpg", tipo: "comple", info:"Un toque especial", precio: 8},
  {id:8, nombre:"Choker Pétalos", img:"./img/cpet.jpg", tipo: "comple", info:"Eleva tu look", precio: 10},
  {id:9, nombre:"Pendientes simples", img:"./img/pendflor1.jpg", tipo: "comple", info:"El más versátil", precio: 10},
  {id:10, nombre:"Pendientes dobles", img:"./img/Pend.jpg", tipo: "comple", info:"Para las más atrevidas", precio: 12},
  {id:11, nombre:"Coletero", img:"./img/coletero.jpg", tipo: "comple", info:"Complemento diario ideal ", precio: 9},
  {id:12, nombre:"Puños", img:"./img/puños.jpg", tipo: "comple", info:"Dale un toque a tu blazer", precio: 25},
];


const clientas = [
    {nombre:"María López", img:"./img/bmanu.jpg", comment:'"Me encanta mi bolso Manuela, es perfecto para cualquier ocasión."'},
    {nombre:"Ana García", img:"./img/pbit.jpg", comment:'"Luciendo mis pendientes y bolso Pepita por Italia. No me lo quito, pega con todo!"'},
    {nombre:"Lucía Fernández", img:"./img/beu.jpg", comment:'"El bolso Eugenia en marrón es súper ponible y me encanta!!"'},
];

const productos = [...catbolsos, ...catcomple];

const buscarProducto = id => productos.find(p => p.id === id);

//creamos cards de bolsos
const catalogob = document.querySelector("#gridBolsos");

for (const b of catbolsos){
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `

    <img src="${b.img}" alt="Foto de ${b.nombre}">
    <h3>${b.nombre}</h4>
    <p>${b.info}</p>
    <p class="precio">${b.precio} €</p>
    <button class="btn" data-id="${b.id}">Añadir</button>
    `;
  catalogob.appendChild(card);
}

const gridb = document.querySelector("#gridBolsos");
gridb.addEventListener("click", (ev) => {
  const btn = ev.target.closest('button[data-id]');
  if (!btn) return;
  const id = +btn.dataset.id;
  
  agregar(id);
});


//creamos cards de complementos
const catalogoc = document.querySelector("#gridComple");

for (const c of catcomple){
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `
    <img src="${c.img}" alt="Foto de ${c.nombre}">
    <h3>${c.nombre}</h4>
    <p>${c.info}</p>
    <p class="precio">${c.precio}  €</p>
    <button class="btn" data-id="${c.id}">Añadir</button>    
  `;
  catalogoc.appendChild(card);
}

catalogoc.addEventListener("click", (ev) => {
  const btn = ev.target.closest('button[data-id]');
  if (!btn) return;
  const id = +btn.dataset.id;
  agregar(id);
});


//creamos cards de clientas
const catalogoClientas = document.querySelector("#gridClientas");

for (const t of clientas){
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `

    <img src="${t.img}" alt="Foto de ${t.nombre}">
      <h3>${t.nombre}</h3>
    <p class="comment">${t.comment}</p>    
  `;
  catalogoClientas.appendChild(card);
};

document.querySelector("#btnVaciar").addEventListener("click", () =>{
    carrito = [];             
    dibujarCarrito(carrito);  
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




