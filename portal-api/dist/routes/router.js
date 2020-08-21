"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var mysql = require('mysql');
const router = express_1.Router();
const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
});
router.post('/login', (req, resp) => {
    const email = req.body.email;
    const password = req.body.password;
    const q = `Select name, email, phone from examen.users where email like '${email}' and password like '${password}'`;
    con.getConnection(function (err) {
        if (err)
            throw err;
        con.query(q, function (err, result, fields) {
            if (err) {
                resp.status(400).json({
                    ok: false,
                    message: err,
                    result: "error"
                });
                throw err;
            }
            else {
                if (result.length == 0) {
                    resp.status(400).json({
                        ok: false,
                        message: "Usuario o contraseña incorrectos",
                        result
                    });
                }
                else {
                    resp.status(200).json({
                        ok: true,
                        message: "All ok",
                        result
                    });
                }
            }
            ;
        });
    });
});
router.post('/register', (req, resp) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;
    const value = { name, password, phone };
    const q = ` INSERT INTO examen.users (name, email, password, phone)
    VALUES ('${name}', '${email}', '${password}', '${phone}'); `;
    con.getConnection(function (err) {
        if (err)
            throw err;
        con.query(q, function (err, result, fields) {
            if (err) {
                resp.status(400).json({
                    ok: false,
                    message: err,
                    result: "error"
                });
                throw err;
            }
            else {
                resp.status(200).json({
                    ok: true,
                    message: "Usuario creado con exito",
                    result: value
                });
            }
            ;
        });
    });
});
exports.default = router;
