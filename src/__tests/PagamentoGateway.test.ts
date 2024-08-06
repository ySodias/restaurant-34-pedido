
import { IPagamentoGateway } from "@/interfaces/gateway/IPagamentoGateway";
import { PagamentoGateway } from "@/gateways/PagamentoGateway";
import mockPagamentoRestAPI from "./mocks/MockPagamentoRestAPI";
import { TipoPagamento } from "@/enums/TipoPagamento";


describe("Produto do pedido", () => {

    let pagamentoGateway: IPagamentoGateway;

    beforeAll(async () => {
        pagamentoGateway = new PagamentoGateway(mockPagamentoRestAPI);
    });

    it("createPagamento", async () => {
        const novoPagamento = {
            idPedido: 1,
            valor: 10,
            tipoPagamento: 'PIX' as TipoPagamento
        }

        const pagamento: any = await pagamentoGateway.createPagamento(novoPagamento);

        expect(pagamento).toBeDefined();
    })
})

