import Cliente from "@/entities/Cliente";
import StatusPedido from "@/entities/StatusPedido";

export interface NovoPedidoDTO{
    id: number;
    cliente:Cliente,
    statusPedido: StatusPedido
}