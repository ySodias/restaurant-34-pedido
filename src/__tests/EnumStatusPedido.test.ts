import { EnumStatusPedido, getDescricaoStatusPedido } from "@/enums/EnumStatusPedido";

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

    it("deve retornar undefined para um código desconhecido", () => {
        expect(getDescricaoStatusPedido(5)).toBeUndefined();
    });
});

describe("Testes para o Enum EnumStatusPedido", () => {
    it("deve ter um status com ID 1 e descrição 'Recebido'", () => {
        expect(EnumStatusPedido.RECEBIDO.id).toBe(1);
        expect(EnumStatusPedido.RECEBIDO.descricao).toBe("Recebido");
    });

    it("deve ter um status com ID 2 e descrição 'Em Preparação'", () => {
        expect(EnumStatusPedido.EM_PREPARACAO.id).toBe(2);
        expect(EnumStatusPedido.EM_PREPARACAO.descricao).toBe("Em Preparação");
    });

    it("deve ter um status com ID 3 e descrição 'Pronto'", () => {
        expect(EnumStatusPedido.PRONTO.id).toBe(3);
        expect(EnumStatusPedido.PRONTO.descricao).toBe("Pronto");
    });

    it("deve ter um status com ID 4 e descrição 'Finalizado'", () => {
        expect(EnumStatusPedido.FINALIZADO.id).toBe(4);
        expect(EnumStatusPedido.FINALIZADO.descricao).toBe("Finalizado");
    });
});
