"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescricaoStatusPedido = exports.EnumStatusPedido = void 0;
const EnumStatusPedido = {
    RECEBIDO: { id: 1, descricao: "Recebido" },
    EM_PREPARACAO: { id: 2, descricao: "Em Preparação" },
    PRONTO: { id: 3, descricao: "Pronto" },
    FINALIZADO: { id: 4, descricao: "Finalizado" }
};
exports.EnumStatusPedido = EnumStatusPedido;
function getDescricaoStatusPedido(codigo) {
    for (const status in EnumStatusPedido) {
        if (EnumStatusPedido[status].id === codigo) {
            return EnumStatusPedido[status].descricao;
        }
    }
    return undefined;
}
exports.getDescricaoStatusPedido = getDescricaoStatusPedido;
