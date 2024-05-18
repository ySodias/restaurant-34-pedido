"use strict";
var StatusPagamento;
(function (StatusPagamento) {
    StatusPagamento["APROVADO"] = "Aprovado";
    StatusPagamento["CANCELADO"] = "Cancelado";
    StatusPagamento["AGUARDANDO_PAGAMENTO"] = "Aguardando pagamento";
    StatusPagamento["FALHA_NO_PAGAMENTO"] = "Falha no pagamento";
})(StatusPagamento || (StatusPagamento = {}));
const StatusPagamentoID = {
    [StatusPagamento.APROVADO]: 101,
    [StatusPagamento.CANCELADO]: 102,
    [StatusPagamento.AGUARDANDO_PAGAMENTO]: 103,
    [StatusPagamento.FALHA_NO_PAGAMENTO]: 104
};
