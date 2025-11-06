
const buscarProducto = id => productos.find(p => p.id === id);

let carrito = [];

function precioConIVA(precio = 0, iva= 0.21){
    return precio + (precio * iva);
}



const catbolsos = [
  {id:1, name:"Eugenia", img:"./img/Eug.jpg", cattipo: "bolso", info: "Para cada día del año",price: 32},
  {id:2, name:"Manuela", img:"./img/Man.jpg", cattipo: "bolso", info:"El más versátil", price: 30},
  {id:3, name:"Pepita", img:"./img/Pep.jpg", cattipo: "bolso", info:"Un toque más moderno", price: 32},
  {id:4, name:"Valeria", img:"./img/Val.jpg", cattipo: "bolso", info:"Perfecto para bodas", price: 30},
  {id:5, name:"Carlota", img:"./img/Carl.jpg", cattipo: "bolso", info:"Para cualquier evento", price: 30},
  {id:6, name:"Julieta", img:"./img/Juli.jpg", cattipo: "bolso", info:"Modelo japonés", price: 35},
];


const catcomple = [
  {id:1, name:"Choker Flor", img:"./img/Imagen de WhatsApp 2025-10-22 a las 09.38.45_5192163e.jpg", cattipo: "comple", info:"Un toque especial", price: 8},
  {id:2, name:"Choker Pétalos", img:"./img/cpet.jpg", cattipo: "comple", info:"Eleva tu look", price: 10},
  {id:3, name:"Pendientes simples", img:"./img/pendflor1.jpg", cattipo: "comple", info:"El más versátil", price: 10},
  {id:4, name:"Pendientes dobles", img:"./img/Pend.jpg", cattipo: "comple", info:"Para las más atrevidas", price: 12},
  {id:5, name:"Coletero", img:"./img/coletero.jpg", cattipo: "comple", info:"Complemento diario ideal ", price: 9},
  {id:6, name:"Puños", img:"./img/puños.jpg", cattipo: "comple", info:"Dale un toque a tu blazer", price: 25},
];


const clientas = [
    {id:1, name:"María López", img:"./img/bmanu.jpg", comment:'"Me encanta mi bolso Manuela, es perfecto para cualquier ocasión."'},
    {id:2, name:"Ana García", img:"./img/pbit.jpg", comment:'"Luciendo mis pendientes y bolso Pepita por Italia."'},
    {id:3, name:"Lucía Fernández", img:"./img/beu.jpg", comment:'"El bolso Eugenia en marrón es súper ponible y me encanta!!"'},
];


//creamos cards de bolsos
const catalogob = document.querySelector("#gridBolsos");

for (const b of catbolsos){
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `

    <img src="${b.img}" alt="Foto de ${b.name}">
    <h3>${b.name}</h4>
    <p>${b.info}</p>
    <p class="price">${b.price} €</p>
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
const catalogoc = document.querySelector("#gridComple");

for (const c of catcomple){
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `
    <img src="${c.img}" alt="Foto de ${c.name}">
    <h3>${c.name}</h4>
    <p>${c.info}</p>
    <p class="price">${c.price}  €</p>
    <button class="btn" data-id="${c.id}">Añadir</button>    
  `;
  catalogoc.appendChild(card);
}

catalogoc.addEventListener("click", (ec) => {
  const btn = ec.target.closest('button[data-id]');
  if (!btn) return;
  const id = +btn.dataset.id;
  agregarc(id);
});


//creamos cards de clientas
const catalogoClientas = document.querySelector("#gridClientas");

for (const t of clientas){
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `

    <img src="${t.img}" alt="Foto de ${t.name}">
      <h3>${t.name}</h4>
    <p>${t.info}</p>
    <p class="comment">${t.comment}</p>    
  `;
  catalogoClientas.appendChild(card);
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