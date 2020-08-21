import Server from "./classes/server";
import router from "./routes/router"
import bP from 'body-parser';
import cors from 'cors';

const SERVER = new Server();


// body parser
SERVER.app.use(bP.urlencoded({ extended: true }))
SERVER.app.use(bP.json());
// CORS
SERVER.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas de servicios
SERVER.app.use('/', router)

SERVER.start(() => {
    console.log("Conrriendo en puerto ", SERVER.port)
})