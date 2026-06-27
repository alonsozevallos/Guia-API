import { crearProducto } from '../models/producto.model.js';

const productos = [
    crearProducto({nombre: 'Teclado mecánico', precio: 120, stock: 8}),
    crearProducto({nombre: 'Mouse inalámbrico', precio: 60, stock: 15})
];

export const productoRepository = {
    findAll(){
        return productos;
    },

    findById(id){
        return productos.find((p) => p.id == id);
    },

    create(datos){
        const nuevo = crearProducto(datos);
        productos.push(nuevo);
        return nuevo;
    },

    update(id, cambios){
        const producto = productos.find((p) => p.id === id);
        if (!producto) return undefined;
        Object.assign(producto, cambios);
        return producto;
    },

    remove(id){
        const indice = productos.findIndex((p) => p.id === id);
        if (indice === -1) return false;
        productos.splice(indice, 1);
        return true; 
    },
};