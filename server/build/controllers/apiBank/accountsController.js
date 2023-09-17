"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountById = exports.getAllAcounts = void 0;
const knexDB_1 = require("../../models/knexDB");
exports.getAllAcounts = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q === undefined) {
            const result = yield knexDB_1.db.raw(`select * from accounts`);
            res.status(200).json(result);
        }
        else {
            const [result] = yield knexDB_1.db.raw(`SELECT * FROM accounts WHERE owner LIKE '%${q}%'`);
            if (!result) {
                res.status(404);
                throw new Error("404 owner NÃO encontrado, insira um nome cadastrado");
            }
            res.status(200).json({ message: "'NOME' do ownwer encontrado no nosso sistema", result });
        }
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
exports.getAccountById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSelect = req.params.id;
        if (idSelect[0] !== "a") {
            res.status(400);
            throw new Error("'id' deve começar com letra 'a'");
        }
        const [result] = yield knexDB_1.db.raw(`SELECT * FROM accounts WHERE id = '${idSelect}'`);
        if (!result) {
            res.status(404);
            throw new Error("404: conta NÃO encontrada, verifique o Id");
        }
        res.status(200).json({ message: "conta encontrado no nosso sistema", result });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=accountsController.js.map