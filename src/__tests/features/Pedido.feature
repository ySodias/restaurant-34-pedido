Feature: Pedido
  Scenario: Criação de pedido bem sucedido
    Given Eu tenho um pedido de criação válido
    When Eu submeto os dados para criar o pedido
    Then o pedido deve ser criado com sucesso

#   Scenario: Failed payment due to insufficient funds
#     Given I have a payment request with insufficient funds
#     When I submit the payment
#     Then the payment should be declined
