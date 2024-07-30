enum StatusPedidoEnum {
    RECEBIDO = 1,
    EM_PREPARACAO = 2,
    PRONTO = 3,
    FINALIZADO = 4,
    AGUARDANDO_PAGAMENTO = 5,
    ERRO_PAGAMENTO = 6,
}

const StatusPedidoDescricao: Record<StatusPedidoEnum, string> = {
    [StatusPedidoEnum.RECEBIDO]: "Recebido",
    [StatusPedidoEnum.EM_PREPARACAO]: "Em Preparação",
    [StatusPedidoEnum.PRONTO]: "Pronto",
    [StatusPedidoEnum.FINALIZADO]: "Finalizado",
    [StatusPedidoEnum.AGUARDANDO_PAGAMENTO]: "Aguardando Pagamento",
    [StatusPedidoEnum.ERRO_PAGAMENTO]: "Erro no Pagamento",
};

function getDescricaoStatusPedido(status: StatusPedidoEnum | number): string {
    if (typeof status === "number") {
        return StatusPedidoDescricao[status as StatusPedidoEnum] || "Desconhecido";
    }
    return StatusPedidoDescricao[status] || "Desconhecido";
}

function getStatusPedidoPorDescricao(descricao: string): StatusPedidoEnum {
    const entry = Object.entries(StatusPedidoDescricao).find(
        ([, value]) => value === descricao
    );
    if (entry) {
        return parseInt(entry[0]) as StatusPedidoEnum;
    }
    throw new Error("Status pedido não localizado");
}

export { StatusPedidoEnum, getDescricaoStatusPedido, getStatusPedidoPorDescricao };
