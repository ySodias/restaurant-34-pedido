import { getDescricaoStatusPedido, StatusPedidoEnum } from "@/enums/EnumStatusPedido";

describe("Testes para a função getDescricaoStatusPedido", () => {
    it("deve retornar 'Recebido' para o código 1", () => {
        expect(getDescricaoStatusPedido(1)).toBe("Recebido");
    });

    it("deve retornar 'Em Preparação' para o código 2", () => {
        expect(getDescricaoStatusPedido(2)).toBe("Em Preparação");
    });

    it("deve retornar 'Pronto' para o código 3", () => {
        expect(getDescricaoStatusPedido(3)).toBe("Pronto");
    });

    it("deve retornar 'Finalizado' para o código 4", () => {
        expect(getDescricaoStatusPedido(4)).toBe("Finalizado");
    });

    it("deve retornar 'Finalizado' para o código 5", () => {
        expect(getDescricaoStatusPedido(5)).toBe("Aguardando Pagamento");
    });

    it("deve retornar 'Finalizado' para o código 6", () => {
        expect(getDescricaoStatusPedido(6)).toBe("Erro no Pagamento");
    });

    it("deve retornar undefined para um código desconhecido", () => {
        expect(getDescricaoStatusPedido(99)).toBe("Desconhecido");
    });
});

describe("Testes para o Enum EnumStatusPedido", () => {
    it("deve ter um status com ID 1 e descrição 'Recebido'", () => {
        expect(StatusPedidoEnum.RECEBIDO).toBe(1);
        expect(getDescricaoStatusPedido(1)).toBe("Recebido");
    });

    it("deve ter um status com ID 2 e descrição 'Em Preparação'", () => {
        expect(StatusPedidoEnum.EM_PREPARACAO).toBe(2);
        expect(getDescricaoStatusPedido(2)).toBe("Em Preparação");
    });

    it("deve ter um status com ID 3 e descrição 'Pronto'", () => {
        expect(StatusPedidoEnum.PRONTO).toBe(3);
        expect(getDescricaoStatusPedido(3)).toBe("Pronto");
    });

    it("deve ter um status com ID 4 e descrição 'Finalizado'", () => {
        expect(StatusPedidoEnum.FINALIZADO).toBe(4);
        expect(getDescricaoStatusPedido(4)).toBe("Finalizado");
    });

    it("deve ter um status com ID 4 e descrição 'Aguardando Pagamento'", () => {
        expect(StatusPedidoEnum.AGUARDANDO_PAGAMENTO).toBe(5);
        expect(getDescricaoStatusPedido(5)).toBe("Aguardando Pagamento");
    });

    it("deve ter um status com ID 4 e descrição 'Erro no Pagamento'", () => {
        expect(StatusPedidoEnum.ERRO_PAGAMENTO).toBe(6);
        expect(getDescricaoStatusPedido(6)).toBe("Erro no Pagamento");
    });
});
