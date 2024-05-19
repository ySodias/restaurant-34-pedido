import StatusPedido from "@/entities/StatusPedido";

export interface NovoPedidoDTO{
    id: number;
    idCliente: number,
    statusPedido: StatusPedido
}