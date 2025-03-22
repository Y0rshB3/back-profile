require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/typeormConfig';
import apiRouter from './routes';
import apiRouterInfo from './routes.info';

const app = express();

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});

app.use(cors());
app.use(express.json());
app.use('/api/v1/info', apiRouterInfo);
app.use('/api/v1', apiRouter);
// Más rutas y controladores según sea necesario

app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor corriendo en el puerto 3000');
});
