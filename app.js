import express from 'express';
import cors from 'cors';
import productoRoutes from './routes/producto.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensaje: 'API de la tienda', code: 200 });
});

// Enlace a las rutas de tus productos
app.use('/productos', productoRoutes);

export default app;