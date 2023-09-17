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
exports.destroyPurchase = exports.createPurchase = exports.getPurchaseById = exports.getAllPurchases = void 0;
const knexDB_1 = require("../../models/knexDB");
exports.getAllPurchases = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knexDB_1.db.raw(`select * from purchases`);
        res.status(200).send({ message: "lista de pagamentos", result });
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
exports.getPurchaseById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSelect = req.params.id;
        const [pgExists] = yield knexDB_1.db.raw(`SELECT id FROM purchases WHERE id="${idSelect}"`);
        if (!pgExists) {
            res.status(404);
            throw new Error("404: Pagamento NÃO Cadastrado");
        }
        const result = yield knexDB_1.db.raw(`SELECT * FROM products_purchases 
        INNER JOIN products
        ON products_purchases.product_id = products.id
        INNER JOIN purchases
        ON products_purchases.purchases_id="${idSelect}"`);
        res.status(200).json({ result, message: `RESULTADO PARA PAGAMENTO IDENTIFICADO ${idSelect}` });
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
exports.createPurchase = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.body.product_id;
        const total_price = req.body.total_price;
        const quantity = req.body.quantity;
        const buyer_id = req.body.buyer_id;
        if (typeof total_price !== "number") {
            throw new Error("preço total deve ser valor numerico valido");
        }
        if (typeof buyer_id !== "string") {
            throw new Error("quantidade de items deve ser valor numerico valida");
        }
        if (typeof quantity !== "number") {
            throw new Error("quantidade de items deve ser valor numerico valida");
        }
        const newId = `${Date.now()}`.toString();
        const newPurchase = {
            id: newId,
            product_id,
            total_price,
            quantity,
            buyer_id
        };
        yield (0, knexDB_1.db)("purchases").insert(newPurchase);
        res.send(200).json({ message: "cadastro realizado com sucesso", newPurchase });
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
exports.destroyPurchase = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id4Delete = req.params.id;
        const [purchaseDelete] = yield (0, knexDB_1.db)("purchases").where({ id: id4Delete });
        if (!purchaseDelete) {
            res.status(404);
            throw new Error("purchase  nao encontrado");
        }
        yield knexDB_1.db.raw(`DELETE FROM products_purchases WHERE purchases_id="${purchaseDelete}"`);
        res.status(200).json({ message: 'pedido cancelado com sucesso' });
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
//# sourceMappingURL=purchasesController.js.map