import PedidoController from '../controllers/PedidoController';
import { Request, Response } from 'express';
import { MockContext, Context, createMockContext } from './context';

const { createUser, getUserById } = require('./userController');
const prismaMock = require('./prismaMock'); // Import your Prisma mock
//jest.mock('./prisma', () => prismaMock); // Mock Prisma with the Prisma mock


// let mockCtx: MockContext
// let ctx: Context

// jest.mock('./prisma', () => prismaMock);

// beforeEach(() => {
//   mockCtx = createMockContext()
//   ctx = mockCtx as unknown as Context
// })

describe('User API', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it('should create and retrieve a user', async () => {
    // Mock user data
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    // Create user
    const createdUser = await createUser(userData.name, userData.email);

    // Mock the Prisma user retrieval
    prismaMock.user.findUnique.mockResolvedValueOnce(createdUser);

    // Retrieve the user by ID
    const retrievedUser = await getUserById(createdUser.id);

    // Assertion
    expect(retrievedUser).toEqual(createdUser);

    // Additional assertions based on your needs
    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        name: userData.name,
        email: userData.email,
      },
    });
    expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: createdUser.id,
      },
    });
  });
});

// Mock do PedidoRepository
const pedidoRepositoryMock: any = {
  createPedido: jest.fn(),
  getPedidoById: jest.fn(),
  getPedidos: jest.fn(),
  getPedidosByStatus: jest.fn(),
  getPedidoByStatusFakeCheckout: jest.fn(),
  addProdutosAoPedido: jest.fn(),
  removeProdutoDoPedido: jest.fn(),
  updatePedido: jest.fn()
};

const pagamentoRestAPIMock: any = {
  createPagamento: jest.fn()
}

const produtoRestAPIMock: any = {
  getProdutoPorId: jest.fn()
}

const pedidoUseCaseMock = {
  executeUpdatePedidoPreparacao: jest.fn().mockImplementation(async (idPedido: number) => {
    if (idPedido !== 1) {
      throw new Error("Pedido não encontrado");
    }
    // Simulando o retorno de um pedido atualizado
    return { id: 1, status: "Em Preparação" };
  })
};

const produtosDoPedidoRepositoryMock: any = {
  addProdutosAoPedido: jest.fn(),
  removeProdutoDoPedido: jest.fn()
};

const pedidoController = new PedidoController(
  pagamentoRestAPIMock,
  pedidoRepositoryMock,
  produtosDoPedidoRepositoryMock,
  produtoRestAPIMock
);

// Mock do request e response
const reqMock = {} as Request;

const resMock = {
  status: jest.fn(() => resMock),
  json: jest.fn()
} as unknown as Response;

describe("PedidoController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPedido", () => {
    it("should create pedido successfully", async () => {
      // Arrange
      reqMock.body = {
        clienteId: 1,
        // outros dados necessários...
      };

      // Act
      await pedidoController.createPedido(reqMock, resMock);

      // Assert
      expect(resMock.status).toHaveBeenCalledWith(201); // Status 201 para criação bem-sucedida
      expect(resMock.json).toHaveBeenCalledWith({
        message: "Pedido criado com sucesso",
        response: expect.any(Object)
      });
    });
    // Adicione mais testes aqui conforme necessário...
  });

  describe("getPedidoById", () => {
    it("should get pedido by id successfully", async () => {
      // Arrange
      reqMock.params = { idPedido: "1" };

      // Act
      await pedidoController.getPedidoById(reqMock, resMock);

      // Assert
      expect(resMock.status).toHaveBeenCalledWith(200); // Status 200 para sucesso
      expect(resMock.json).toHaveBeenCalledWith({
        response: {
          data: expect.any(Array),
          message: expect.any(String),
          success: true
        }
      });
    });

    it("should get pedidos by status successfully", async () => {
      // Arrange
      reqMock.params = { idStatusPedido: "1" };

      // Act
      await pedidoController.getPedidosByStatus(reqMock, resMock);

      // Assert
      expect(resMock.status).toHaveBeenCalledWith(200); // Status 200 para sucesso
      expect(resMock.json).toHaveBeenCalledWith({
        // Ajuste para o formato correto da resposta
        response: {
          data: expect.any(Array),
          message: expect.any(String),
          success: true
        }
      });
    });
    // Adicione mais testes aqui conforme necessário...
  });

  describe("getPedidos", () => {
    it("should get pedidos successfully", async () => {
      // Arrange
      const mockPedidos = [
        {
          id: 3,
          clienteId: 3,
          statusPedidoId: 3,
          createdAt: "04/05/2024 10:24:31",
          updatedAt: "04/05/2024 10:24:31",
          statusPedido: { id: 3, enumerador: "Pronto" },
          cliente: { nome: "Pedro Oliveira" }
        },
        {
          id: 5,
          clienteId: 5,
          statusPedidoId: 2,
          createdAt: "04/05/2024 10:24:31",
          updatedAt: "04/05/2024 10:24:31",
          statusPedido: { id: 2, enumerador: "Em preparação" },
          cliente: { nome: "Ricardo Sousa" }
        },
        {
          id: 1,
          clienteId: 1,
          statusPedidoId: 2,
          createdAt: "04/05/2024 10:24:31",
          updatedAt: "04/05/2024 10:24:31",
          statusPedido: { id: 2, enumerador: "Em preparação" },
          cliente: { nome: "João Silva" }
        },
        {
          id: 2,
          clienteId: 2,
          statusPedidoId: 1,
          createdAt: "04/05/2024 10:24:31",
          updatedAt: "04/05/2024 10:24:31",
          statusPedido: { id: 1, enumerador: "Recebido" },
          cliente: { nome: "Maria Santos" }
        }
      ];

      pedidoRepositoryMock.getPedidos.mockResolvedValue(mockPedidos);

      // Act
      await pedidoController.getPedidos(reqMock, resMock);

      // Assert
      expect(resMock.status).toHaveBeenCalledWith(200); // Status 200 para sucesso
      expect(resMock.json).toHaveBeenCalledWith({
        response: {
          data: expect.arrayContaining(mockPedidos.map((pedido: any) => ({
            ...pedido,
            createdAt: expect.stringMatching(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/),
            updatedAt: expect.stringMatching(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/)
          }))),
          message: "Pedidos ordenados pelo status(Pronto > Em Preparação > Recebido) e pela data. Não mostra os finalizados",
          success: true
        }
      });
    });
  });





  describe("getPedidosByStatus", () => {
    it("should get pedidos by status successfully", async () => {
      // Arrange
      reqMock.params = { idStatusPedido: "1" };

      // Act
      await pedidoController.getPedidosByStatus(reqMock, resMock);

      // Assert
      expect(resMock.status).toHaveBeenCalledWith(200); // Status 200 para sucesso
      expect(resMock.json).toHaveBeenCalledWith({
        // Ajuste para o formato correto da resposta
        response: {
          data: expect.any(Array),
          message: expect.any(String),
          success: true
        }
      });
    });
    // Adicione mais testes aqui conforme necessário...
  });

  describe("getPedidoFakeCheckout", () => {
    it("should get pedido fake checkout successfully with uppercase status", async () => {
      // Arrange
      reqMock.params = { status: "Recebido" }; // Definindo o status como "Em"

      // Act
      try {
        await pedidoController.getPedidoFakeCheckout(reqMock, resMock);
      } catch (error) {
        console.error("Erro ao fazer o fake checkout:", error);
      }


      // Assert
      expect(resMock.json).toHaveBeenCalledWith({
        response: {
          data: expect.any(Array),
          message: expect.any(String),
          success: true
        }
      });
    });
  });


  describe("addProdutosAoPedido", () => {
    it("should add produtos ao pedido successfully", async () => {
      // Arrange
      reqMock.params = { idPedido: "1" };
      reqMock.body = { listaProdutos: [{ produtoId: 1, quantidade: 2 }] };

      // Act
      await pedidoController.addProdutosAoPedido(reqMock, resMock);

      // Assert
      expect(resMock.status).toHaveBeenCalledWith(200); // Status 200 para sucesso
      expect(resMock.json).toHaveBeenCalledWith({
        response: expect.any(Object)
      });
    });
    // Adicione mais testes aqui conforme necessário...
  });

  describe("removeProdutoDoPedido", () => {
    it("should remove produto do pedido successfully", async () => {
      // Arrange
      reqMock.params = { idPedido: "1" };
      reqMock.body = { listaProdutos: [{ produtoId: 1 }] };

      // Act
      await pedidoController.removeProdutoDoPedido(reqMock, resMock);

      // Assert
      expect(resMock.status).toHaveBeenCalledWith(200); // Status 200 para sucesso
      expect(resMock.json).toHaveBeenCalledWith({
        response: expect.any(Object)
      });
    });
    // Adicione mais testes aqui conforme necessário...
  });

  describe("updatePedido", () => {
    it("should update pedido status successfully", async () => {
      // Arrange
      reqMock.params = { idPedido: "1" };
      reqMock.body = { statusPedido: "Em Preparação" };

      // Mock da função executeUpdatePedidoPreparacao
      pedidoUseCaseMock.executeUpdatePedidoPreparacao.mockResolvedValue({
        id: 1,
        status: "Em Preparação"
      });

      // Act
      await pedidoController.updatePedido(reqMock, resMock);

      // Assert
      expect(resMock.status).toHaveBeenCalledWith(200); // Status 200 para sucesso
      expect(resMock.status).toHaveBeenCalledTimes(1); // Garante que a função status foi chamada uma vez
      expect(resMock.json).toHaveBeenCalledWith({
        update: expect.objectContaining({
          id: expect.any(Number),
          status: "Em Preparação"
        })
      });
    });
  });


});
