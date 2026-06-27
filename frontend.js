const API = 'http://localhost:3000/productos';

async function listarProductos() {
    const respuesta = await fetch(API);
    const productos = await respuesta.json();
    return productos;
}

async function crearProducto(datos){
    const respuesta = await fetch(API, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' }, // 1. Corregido: Decía 'application7json'
        body: JSON.stringify(datos),
    });

    if(!respuesta.ok){
        throw new Error('No se pudo crear el producto');
    }
    return await respuesta.json();
}

async function actualizarProducto(id, cambios){
    // 2. Corregido: Para usar ${} debes usar comillas invertidas (``) en vez de comillas simples ('')
    const respuesta = await fetch(`${API}/${id}`, { 
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cambios),
    });
    return await respuesta.json();
}

async function eliminarProducto(id) {
    // Corregido a comillas invertidas (``)
    const respuesta = await fetch(`${API}/${id}`, {method: 'DELETE'});
    return respuesta.ok;
}

async function pintarProductos(){
    const respuesta = await fetch(API);
    const productos = await respuesta.json();

    const lista = document.getElementById('lista');
    if(!lista) return; // Seguridad por si el HTML aún no carga
    
    lista.innerHTML = '';
    for (const p of productos){
        const item = document.createElement('li');
        // Corregido a comillas invertidas (``)
        item.textContent = `${p.nombre} - S/ ${p.precio}`; 
        lista.appendChild(item);
    }
}

// 3. Corregido: El listener va AFUERA de la función para que no se duplique en memoria al agregar productos
document.getElementById('agregar')?.addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value;
    const precio = Number(document.getElementById('precio').value);
    
    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio }),
    });
    await pintarProductos();
});

// Arranca la carga inicial de datos al abrir la página web
pintarProductos();