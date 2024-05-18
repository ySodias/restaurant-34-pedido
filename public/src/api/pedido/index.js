"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { CognitoVerifier } from "../auth/AuthMiddleware";
class PedidoRoutes {
    // private cognitoVerifier: CognitoVerifier;
    constructor(express, produtoController, BASE_URL) {
        this.express = express;
        this.pedidoController = produtoController;
        this.BASE_URL = BASE_URL;
        //this.cognitoVerifier = new CognitoVerifier();
    }
    buildRoutes() {
        this.express
            .post(`${this.BASE_URL}/pedido`, 
        // this.cognitoVerifier.verifyCognitoJWT.bind(
        //     this.cognitoVerifier
        // )
        // ,
        this.pedidoController.createPedido.bind(this.pedidoController))
            .get(`${this.BASE_URL}/pedido/:idPedido`, 
        // this.cognitoVerifier.verifyCognitoJWT.bind(
        //     this.cognitoVerifier
        // ),
        this.pedidoController.getPedidoById.bind(this.pedidoController))
            .get(`${this.BASE_URL}/pedidos`, 
        // this.cognitoVerifier.verifyCognitoJWT.bind(
        //     this.cognitoVerifier
        // ),
        this.pedidoController.getPedidos.bind(this.pedidoController))
            .get(`${this.BASE_URL}/pedido/status/:idStatusPedido`, 
        // this.cognitoVerifier.verifyCognitoJWT.bind(
        //     this.cognitoVerifier
        // ),
        this.pedidoController.getPedidosByStatus.bind(this.pedidoController))
            .get(`${this.BASE_URL}/pedido/status/fakeCheckout/:status`, 
        // this.cognitoVerifier.verifyCognitoJWT.bind(
        //     this.cognitoVerifier
        // ),
        this.pedidoController.getPedidoFakeCheckout.bind(this.pedidoController))
            .post(`${this.BASE_URL}/pedido/:idPedido/produto`, 
        // this.cognitoVerifier.verifyCognitoJWT.bind(
        //     this.cognitoVerifier
        // ),
        this.pedidoController.addProdutosAoPedido.bind(this.pedidoController))
            .delete(`${this.BASE_URL}/pedido/:idPedido/produto`, this.pedidoController.removeProdutoDoPedido.bind(this.pedidoController))
            .patch(`${this.BASE_URL}/pedido/:idPedido/alterar-status`, this.pedidoController.updatePedido.bind(this.pedidoController));
    }
}
exports.default = PedidoRoutes;
