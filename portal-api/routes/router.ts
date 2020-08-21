
import { Router, Request, Response } from 'express';
var mysql = require('mysql');


const router = Router();

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
});

router.post('/login', (req: Request, resp: Response) => {

    const email = req.body.email;
    const password = req.body.password;
    const q = `Select name, email, phone from examen.users where email like '${email}' and password like '${password}'`;

    con.getConnection(function (err: any) {
        if (err) throw err;

        con.query(q, function (err: any, result: any, fields: any) {

            if (err) {
                resp.status(400).json({
                    ok: false,
                    message: err,
                    result: "error"
                });
                throw err;
            } else {
                if (result.length == 0) {
                    resp.status(400).json({
                        ok: false,
                        message: "Usuario o contraseña incorrectos",
                        result
                    })
                } else {
                    resp.status(200).json({
                        ok: true,
                        message: "All ok",
                        result
                    })
                }

            };
        });
    });

});

router.post('/register', (req: Request, resp: Response) => {

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;

    const value = { name,password,phone }

    const q = ` INSERT INTO examen.users (name, email, password, phone)
    VALUES ('${name}', '${email}', '${password}', '${phone}'); `

    con.getConnection(function (err: any) {
        if (err) throw err;

        con.query(q, function (err: any, result: any, fields: any) {

            if (err) {
                resp.status(400).json({
                    ok: false,
                    message: err,
                    result: "error"
                });
                throw err;
            } else {
                resp.status(200).json({
                    ok: true,
                    message: "Usuario creado con exito",
                    result: value
                })
            };
        });
    });

});

export default router;