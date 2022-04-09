require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';

let app = express();

viewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

initWebRoutes(app);

let port = process.env.port || 8080;

app.listen(port, () => { 
    console.log('Emma Stone is running at the port:', port)
})