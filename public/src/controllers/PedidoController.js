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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pedido_1 = require("@/gateways/pedido");
const PedidoUseCase_1 = __importDefault(require("@/usecases/pedido/PedidoUseCase"));
const produtosDoPedido_1 = require("@/gateways/produtosDoPedido");
const BasePresenter_1 = require("@/presenters/BasePresenter");
const EnumStatusPedido_1 = require("@/enums/EnumStatusPedido");
class PedidoController {
    constructor(pedidoRepository, produtosDoPedidoRepository) {
        this.basePresenter = new BasePresenter_1.BasePresenter();
        this.pedidoGateway = new pedido_1.PedidoGateway(pedidoRepository);
        this.produtosDoPedidoGateway = new produtosDoPedido_1.ProdutoDoPedidoGateway(produtosDoPedidoRepository);
        this.pedidoUseCase = new PedidoUseCase_1.default(this.produtosDoPedidoGateway, this.pedidoGateway);
    }
    createPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidoData = req.body;
            try {
                if (!(pedidoData === null || pedidoData === void 0 ? void 0 : pedidoData.clienteId)) {
                    const response = this.basePresenter.presenterMensagemParaRespostaHttp("Erro ao criar pedido: campos obrigatórios ausentes", false);
                    return res.status(400).json(response);
                }
                const pedido = yield this.pedidoUseCase.executeCreation(pedidoData);
                const response = BasePresenter_1.BasePresenter.presenterEntityParaRespostaHttp("Pedido criado com sucesso", true, pedido);
                return res.status(201).json({ message: "Pedido criado com sucesso", response });
            }
            catch (error) {
                const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "Erro interno ao criar o pedido";
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(errorMessage, false);
                return res.status(500).json(response);
            }
        });
    }
    getPedidoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPedido } = req.params;
            try {
                if (!idPedido) {
                    const response = this.basePresenter.presenterMensagemParaRespostaHttp("Erro ao buscar pedido: campo 'idPedido' é obrigatório", false);
                    return res.status(400).json(response);
                }
                const pedido = yield this.pedidoUseCase.executeGetPedidoById(parseInt(idPedido));
                const response = BasePresenter_1.BasePresenter.presenterEntityParaRespostaHttp(`Pedido id ${pedido.id}`, true, pedido);
                return res.status(200).json({ response });
            }
            catch (error) {
                const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "Erro interno ao buscar o pedido";
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(errorMessage, false);
                return res.status(500).json(response);
            }
        });
    }
    getPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pedidos = yield this.pedidoUseCase.executeGetPedidos();
                const response = BasePresenter_1.BasePresenter.presenterEntitysParaRespostaHttp("Pedidos ordenados pelo status(Pronto > Em Preparação > Recebido) e pela data. Não mostra os finalizados", true, pedidos);
                return res.status(200).json({ response });
            }
            catch (error) {
                const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "Erro interno ao buscar os pedidos";
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(errorMessage, false);
                return res.status(500).json(response);
            }
        });
    }
    getPedidosByStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idStatusPedido } = req.params;
            try {
                if (!idStatusPedido) {
                    const response = this.basePresenter.presenterMensagemParaRespostaHttp("Erro ao buscar pedidos: campo 'idStatusPedido' é obrigatório", false);
                    return res.status(400).json(response);
                }
                const pedidos = yield this.pedidoUseCase.executeGetPedidosByStatus(parseInt(idStatusPedido));
                const response = BasePresenter_1.BasePresenter.presenterEntitysParaRespostaHttp(`Pedidos no status ${(0, EnumStatusPedido_1.getDescricaoStatusPedido)(parseInt(idStatusPedido))}`, true, pedidos);
                return res.status(200).json({ response });
            }
            catch (error) {
                const errorMessage = (error === null || error === void 0 ? void 0 : error.message) ||
                    `Erro interno ao buscar os pedidos no status: ${(0, EnumStatusPedido_1.getDescricaoStatusPedido)(parseInt(idStatusPedido))}`;
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(errorMessage, false);
                return res.status(500).json(response);
            }
        });
    }
    getPedidoFakeCheckout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status } = req.params;
            try {
                const pedido = yield this.pedidoUseCase.executeGetPedidoFakeCheckout(status);
                return res.status(200).json({ pedido });
            }
            catch (error) {
                const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "Erro interno ao fazer o fake checkout";
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(errorMessage, false);
                return res.status(500).json(response);
            }
        });
    }
    addProdutosAoPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { listaProdutos } = req.body;
            const { idPedido } = req.params;
            try {
                if (!listaProdutos || !idPedido) {
                    const response = this.basePresenter.presenterMensagemParaRespostaHttp("Erro ao adicionar produto(s) ao pedido: os campos 'listaProdutos' e'idPedido' são obrigatórios", false);
                    return res.status(400).json(response);
                }
                const produtosDoPedido = listaProdutos.map((produtoDoPedido) => (Object.assign({ pedidoId: parseInt(idPedido) }, produtoDoPedido)));
                const data = yield this.pedidoUseCase.executeAddProdutosAoPedido(produtosDoPedido);
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(`${data === null || data === void 0 ? void 0 : data.count} produto(s) adicionado(s) ao pedido`, true);
                return res.status(200).json({ response });
            }
            catch (error) {
                const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "Erro interno ao adicionar produto(s) ao pedido";
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(errorMessage, false);
                return res.status(500).json(response);
            }
        });
    }
    removeProdutoDoPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { listaProdutos } = req.body;
            const { idPedido } = req.params;
            try {
                if (!listaProdutos || !idPedido) {
                    const response = this.basePresenter.presenterMensagemParaRespostaHttp("Erro ao remover produto(s) ao pedido: os campos 'listaProdutos' e'idPedido' são obrigatórios", false);
                    return res.status(400).json(response);
                }
                this.pedidoUseCase.executeRemoveProdutoDoPedido(parseInt(idPedido), listaProdutos);
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(`Produto(s) removido(s) do pedido ${idPedido}`, true);
                return res.status(200).json({ response });
            }
            catch (error) {
                const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "Erro interno ao adicionar produto(s) ao pedido";
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(errorMessage, false);
                return res.status(500).json(response);
            }
        });
    }
    updatePedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { idPedido } = req.params;
            const statusPedido = body === null || body === void 0 ? void 0 : body.statusPedido;
            const updatePedidoDict = {
                "Em Preparação": this.pedidoUseCase.executeUpdatePedidoPreparacao.bind(this.pedidoUseCase),
                Pronto: this.pedidoUseCase.executeUpdatePedidoPronto.bind(this.pedidoUseCase),
                Finalizado: this.pedidoUseCase.executeUpdatePedidoFinalizado.bind(this.pedidoUseCase),
            };
            if (!statusPedido) {
                return res
                    .status(400)
                    .json({ message: "statusPedido não informado" });
            }
            if (!idPedido) {
                return res.status(400).json({ message: "idPedido não informado" });
            }
            try {
                const updateFunction = updatePedidoDict[statusPedido];
                const update = yield updateFunction(parseInt(idPedido));
                return res.status(200).json({ update });
            }
            catch (error) {
                return res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
}
exports.default = PedidoController;
