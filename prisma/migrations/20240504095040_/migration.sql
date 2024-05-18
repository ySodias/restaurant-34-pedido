-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoAcesso" (
    "id" SERIAL NOT NULL,
    "enumerador" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TipoAcesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "tipoAcesso" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "admin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "statusPedidoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusPedido" (
    "id" SERIAL NOT NULL,
    "enumerador" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusPedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusPagamento" (
    "id" SERIAL NOT NULL,
    "enumerador" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusPagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cardapio" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cardapio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdutosDoPedido" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProdutosDoPedido_pkey" PRIMARY KEY ("produtoId","pedidoId","id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "categoriaProdutoId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" SERIAL NOT NULL,
    "statusPagamentoId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaProduto" (
    "id" SERIAL NOT NULL,
    "enumerador" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriaProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdutosDoCardapio" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "cardapioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProdutosDoCardapio_pkey" PRIMARY KEY ("produtoId","cardapioId","id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_usuarioId_key" ON "Cliente"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "TipoAcesso_enumerador_key" ON "TipoAcesso"("enumerador");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_login_key" ON "Usuario"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_usuarioId_key" ON "Funcionario"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "StatusPedido_enumerador_key" ON "StatusPedido"("enumerador");

-- CreateIndex
CREATE UNIQUE INDEX "StatusPagamento_enumerador_key" ON "StatusPagamento"("enumerador");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaProduto_enumerador_key" ON "CategoriaProduto"("enumerador");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_statusPedidoId_fkey" FOREIGN KEY ("statusPedidoId") REFERENCES "StatusPedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutosDoPedido" ADD CONSTRAINT "ProdutosDoPedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutosDoPedido" ADD CONSTRAINT "ProdutosDoPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoriaProdutoId_fkey" FOREIGN KEY ("categoriaProdutoId") REFERENCES "CategoriaProduto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_statusPagamentoId_fkey" FOREIGN KEY ("statusPagamentoId") REFERENCES "StatusPagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutosDoCardapio" ADD CONSTRAINT "ProdutosDoCardapio_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutosDoCardapio" ADD CONSTRAINT "ProdutosDoCardapio_cardapioId_fkey" FOREIGN KEY ("cardapioId") REFERENCES "Cardapio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
