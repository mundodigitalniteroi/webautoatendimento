const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = 3000; // Porta para o servidor HTTP (Express)
const wsPort = 8080; // Porta para o servidor WebSocket

// Configura o servidor WebSocket
const wss = new WebSocket.Server({ port: wsPort });
const clients = new Map(); // Armazena os clientes conectados por client_transaction_id
let values = []; // Armazena os webhooks recebidos

wss.on('connection', (ws) => {
  console.log('Cliente conectado ao WebSocket');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.client_transaction_id) {
      clients.set(data.client_transaction_id, ws); // Associa o cliente ao client_transaction_id
      console.log(`Cliente registrado para client_transaction_id: ${data.client_transaction_id}`);
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
    for (let [id, client] of clients) {
      if (client === ws) clients.delete(id); // Remove o cliente desconectado
    }
  });

  ws.on('error', (error) => {
    console.error('Erro no WebSocket:', error);
  });
});

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Endpoint do webhook (return_url)
app.post('/webhook', (req, res) => {
  const body = req.body; // O corpo completo do webhook
  const payload = body.payload; // O payload dentro do corpo
  console.log('Webhook recebido:', body);

  // Armazena o corpo completo do webhook
  values.push(body);

  // Envia a notificação ao cliente conectado via WebSocket
  const clientTransactionId = payload.client_transaction_id;
  const client = clients.get(clientTransactionId);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(body)); // Envia o corpo completo do webhook
    console.log(`Notificação enviada para client_transaction_id: ${clientTransactionId}`);
  } else {
    console.log('Nenhum cliente encontrado para client_transaction_id:', clientTransactionId);
  }

  // Responde ao webhook com status 200
  res.status(200).send({ message: 'Webhook recebido com sucesso' });
});

// Endpoint GET para recuperar todos os webhooks
app.get('/webhooks', (req, res) => {
  const allWebhooks = values;
  
  if (allWebhooks.length > 0) {
    res.status(200).json(allWebhooks);
  } else {
    res.status(200).json({ message: 'Nenhum webhook recebido ainda', data: [] });
  }
});

// Inicia o servidor Express
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
  console.log(`Webhook disponível em http://localhost:${port}/webhook`);
  console.log(`WebSocket disponível em ws://localhost:${wsPort}`);
});