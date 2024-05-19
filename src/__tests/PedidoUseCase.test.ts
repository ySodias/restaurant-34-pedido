import PedidoUseCase from "@/usecases/pedido/PedidoUseCase"
import mockPedidoGateway from "./mocks/MockPedidoGateway";
import mockProdutoDoPedidoGateway from "./mocks/MockProdutoDoPedidoGateway";
import mockPagamentoGateway from "./mocks/MockPagamentoGateway";
import { Pedido } from "@/entities/Pedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import StatusPedido from "@/entities/StatusPedido";
import mockProdutoGateway from "./mocks/MockProdutoGateway";
import { EnumStatusPedido } from "@/enums/EnumStatusPedido";
import mockProdutosDoPedidoRepository from "./mocks/MockProdutoDoPedidoRepository";


describe("Pedido Use Case", () => {
    let pedidoUseCase: PedidoUseCase;

    beforeAll(async () => {
        pedidoUseCase = new PedidoUseCase(mockProdutoDoPedidoGateway, mockPedidoGateway, mockPagamentoGateway, mockProdutoGateway);
    })

    afterAll(async () => {
        jest.clearAllMocks();
    })

    it("deve retornar um pedido por id, caso encontre", async () => {
        const pedido: any = await pedidoUseCase.executeGetPedidoById(1);

        expect(pedido).toBeDefined();
    })

    it("executa criacao", async () => {
        const pedidos = criarPedidoFake();

        const pedido: any = await pedidoUseCase.executeCreation(pedidos);

        expect(pedido).toBeDefined();
    })

    it("executa get pedidos", async () => {
        const pedido: any = await pedidoUseCase.executeGetPedidos();

        expect(pedido).toBeDefined();
    })

    it("executa get pedidos by status", async () => {

        const pedido: any = await pedidoUseCase.executeGetPedidosByStatus(1);

        expect(pedido).toBeDefined();
    })

    it("executa get pedidos by fake checkout", async () => {

        const pedido: any = await pedidoUseCase.executeGetPedidoFakeCheckout("Pronto");

        expect(pedido).toBeDefined();
    })

    it("executa add Produtos ao pedido", async () => {

        const produtos = {
            id: 1,
            produtoId: 1,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 2,
            valor: 20,
            createdAt: new Date,
            updatedAt: new Date
        } as ProdutosDoPedido

        const pedido: any = await pedidoUseCase.executeAddProdutosAoPedido([produtos]);

        expect(pedido).toBeDefined();
    })

    it("executa remove produto do pedido", async () => {
        // Simula a execução do método para remover um produto do pedido
        const idPedido = 1; // ID do pedido fictício
        const idProduto = 1; // ID do produto fictício
        const response = await pedidoUseCase.executeRemoveProdutoDoPedido(idPedido, idProduto);

        // Mocka a função removeProdutoDoPedido do PedidoGateway
        jest.mock('./mocks/MockProdutoDoPedidoGateway', () => {
            return {
                removeProdutoDoPedido: jest.fn(),
            };
        });

        // Verifica se a resposta foi definida
        expect(response).toBeUndefined();
    });

    it("executa delete", async () => {

        const pedido: any = pedidoUseCase.executeDelete(1);

        expect(pedido).toBeDefined();
    })

    it("executa update pedido finalizado", async () => {

      jest.spyOn(mockProdutoDoPedidoGateway, "getProdutosDoPedido")
      .mockImplementation(async (idPedido: number) => {
          return mockProdutosDoPedidoRepository.get(idPedido);
      }).mockResolvedValue([
        {
          id: 1,
          produtoId: 1,
          pedidoId: 1,
          pedido: {} as Pedido,
          quantidade: 2,
          valor: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

        // Simula a execução do método para atualizar o status de um pedido para "Finalizado"
        const idPedido = 1; // ID do pedido fictício
        const response = await pedidoUseCase.executeUpdatePedidoFinalizado(idPedido);
        const pedidoParaAtualizar: any = {
            id: idPedido,
            pagamentoId: "6648a8dac6e6d476715599b9",
            statusPedido: EnumStatusPedido.FINALIZADO
        }
        // Verifica se o método foi chamado com o ID correto e status "Finalizado"
        expect(mockPedidoGateway.updatePedidoCompleto).toHaveBeenCalledWith(pedidoParaAtualizar);

        // Verifica se a resposta foi definida
        expect(response).toBeDefined();
    });


    it("Deve retornar um array 0", async () => {
        const pedidoId = 1;
      
        // Mock getProdutosDoPedido to return an empty array
        jest.spyOn(mockProdutoDoPedidoGateway, "getProdutosDoPedido")
          .mockImplementation(async (idPedido: number) => {
              return mockProdutosDoPedidoRepository.get(idPedido);
        }).mockResolvedValue([]);
      
        const total = await pedidoUseCase.calculaValorDoPedido(pedidoId);
        expect(total).toBe(0);
        
      });
      
      it("Deve calcular somente um produto", async () => {
        const pedidoId = 1;
        const expectedTotal = 20; // Quantity 2 * Value 10
      
        // Mock getProdutosDoPedido to return a single product
        jest.spyOn(mockProdutoDoPedidoGateway, "getProdutosDoPedido")
          .mockImplementation(async (idPedido: number) => {
              return mockProdutosDoPedidoRepository.get(idPedido);
        }).mockResolvedValue([
          {
            id: 1,
            produtoId: 1,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 2,
            valor: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      
        const total = await pedidoUseCase.calculaValorDoPedido(pedidoId);
        expect(total).toBe(expectedTotal);
      });
      
      it("Deve calcular varios produtos", async () => {
        const pedidoId = 1;
        const expectedTotal = 55; // Product 1: 20 + Product 2: 35
      
        jest.spyOn(mockProdutoDoPedidoGateway, "getProdutosDoPedido")
          .mockImplementation(async (idPedido: number) => {
              return mockProdutosDoPedidoRepository.get(idPedido);
        }).mockResolvedValue([
          {
            id: 1,
            produtoId: 1,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 2,
            valor: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            produtoId: 2,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 1,
            valor: 35,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      
        const total = await pedidoUseCase.calculaValorDoPedido(pedidoId);
        expect(total).toBe(expectedTotal);
      });


    // Testes para os demais métodos seguem o mesmo padrão

})



function criarPedidoFake(): Pedido {
    // Dados fictícios do pedido
    const pedido: Pedido = {
        id: 1,
        clienteId: 1,
        pagamentoId: 1,
        statusPedidoId: 1,
        statusPedido: { id: 1, enumerador: "Em Preparação" } as StatusPedido,
        ProdutosDoPedido: [
            {
                id: 1,
                produtoId: 1,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
                createdAt: new Date,
                updatedAt: new Date
            } as ProdutosDoPedido,
            {
                id: 2,
                produtoId: 2,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 1,
                valor: 15,
                createdAt: new Date,
                updatedAt: new Date
            } as ProdutosDoPedido,
        ],
        createdAt: new Date,
        updatedAt: new Date
    };

    return pedido;
}