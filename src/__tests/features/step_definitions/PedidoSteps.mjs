import { expect } from 'chai';
import { Given, Then, When } from '@cucumber/cucumber';
import server from '../../../../public/server.js'
import { EnumStatusPedido } from '../../../../public/enums/EnumStatusPedido.js';

let response;
let pedido;

// Supondo que EnumStatusPedido é um enum importado de outro módulo. 
// Certifique-se de ajustar a importação conforme necessário.
// import { EnumStatusPedido } from 'caminho/para/EnumStatusPedido'; 

Given('Eu tenho um pedido de criação válido', function () {
    pedido = {
        clienteId: 1,
        pagamentoId: "1",
        statusPedidoId: 1,
        statusPedido: EnumStatusPedido.RECEBIDO,
        ProdutosDoPedido: [
            {
                id: 1,
                produtoId: 1,
                quantidade: 1,
                valor: 10
            }
        ]
    };
});

When('Eu submeto os dados para criar o pedido', async function () {
    response = await server.default.post('/api/pedido').send(pedido);
});

Then('o pedido deve ser criado com sucesso', function () {
    expect(response.status).to.equal(201);
});
