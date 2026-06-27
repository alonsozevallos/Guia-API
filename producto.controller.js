import { productoRepository } from '../repositories/producto.repository.js';

export async function listarProductos(req, res) {
    const productos = await productoRepository.findAll();
    res.json(productos);
}

export async function obtenerProducto(req, res){
    const id = Number(req.params.id);
    const producto = await productoRepository.findById(id);

    if (!producto){
        return res.status(404).json({mensaje: 'Producto no encontrado'});
    }
    res.json(producto);
}

export async function crearProducto(req, res){
    const {nombre, precio, stock} = req.body;

    if (!nombre || precio === undefined){
        return res.status(400).json({mensaje: "nombre y precio son obligatorios"});
    }

    const nuevo = await productoRepository.create({nombre, precio, stock});
    res.status(201).json(nuevo);
}

export async function actualizarProducto(req, res) {
    const id = Number(req.params.id);
    const actualizado = await productoRepository.update(id, req.body);

    if (!actualizado){
        return res.status(404).json({mensaje: 'Producto no encontrado'});
    }
    res.json(actualizado);
}

export async function eliminarProducto(req,res){
    const id = Number(req.params.id);
    const eliminado = await productoRepository.remove(id);

    if(!eliminado){
        return res.status(404).json({mensaje: 'Producto no encontrado'});
    }
    res.status(204).send();
}