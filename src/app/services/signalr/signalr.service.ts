import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public paymentStatus$ = new Subject<{ status: string }>();
  private reconnecting = false; // Flag para evitar reconexões simultâneas
  private readonly reconnectInterval = 5000; // Intervalo de reconexão em milissegundos (5 segundos)

  constructor() {
    this.startConnection();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://3085-2804-d41-ab26-9900-a8f9-a2b6-8838-f8d0.ngrok-free.app/paymentHub', {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Conexão SignalR estabelecida');
        this.reconnecting = false; // Reseta a flag ao conectar com sucesso
      })
      .catch(err => console.error('Erro ao conectar ao SignalR:', err));

    this.hubConnection.on('ReceivePaymentStatus', (status: string) => {
      console.log('Status:', status);
      this.paymentStatus$.next({ status });
    });

    // Detecta o fechamento da conexão e tenta reconectar
    this.hubConnection.onclose((error) => {
      console.error('Conexão SignalR fechada:', error || 'Desconexão detectada');
      this.attemptReconnect();
    });
  }

  private attemptReconnect() {
    if (this.reconnecting) {
      console.log('Reconexão já em andamento, ignorando nova tentativa');
      return;
    }

    this.reconnecting = true;
    console.log('Tentando reconectar ao SignalR...');

    const reconnect = () => {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Reconexão SignalR bem-sucedida');
          this.reconnecting = false;
        })
        .catch(err => {
          console.error('Erro ao reconectar ao SignalR:', err);
          setTimeout(reconnect, this.reconnectInterval); // Tenta novamente após o intervalo
        });
    };

    setTimeout(reconnect, this.reconnectInterval); // Inicia a tentativa de reconexão após o intervalo
  }

}