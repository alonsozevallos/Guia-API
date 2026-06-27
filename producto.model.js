let secuenciaId = 1;

export function crearProducto({nombre, precio, stock}){
    return {
        id: secuenciaId++,
        nombre,
        precio,
        stock: stock ?? 0,
    };
}