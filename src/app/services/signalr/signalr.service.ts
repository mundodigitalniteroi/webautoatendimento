import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public paymentStatus$ = new Subject<{ status: string }>();
  private urlHub = environment.urlApiAtendimento;
  private reconnecting = false; // Flag para evitar reconexões simultâneas
  private readonly reconnectInterval = 5000; // Intervalo de reconexão em milissegundos (5 segundos)

  constructor() {
    this.startConnection();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.urlHub}/paymentHub`, {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
      })
      .catch(err => console.error('Erro ao conectar ao SignalR:', err));

    this.hubConnection.on('ReceivePayment', (status: string) => {
      this.paymentStatus$.next({ status });
    });

    // Detecta o fechamento da conexão e tenta reconectar
    this.hubConnection.onclose((error) => {
      this.startConnection()
    });
  }

  receivePayment(client_transaction_id: string) {
    this.hubConnection.invoke('ReceivePayment', client_transaction_id).then((data) => console.log(data)).catch((err) => console.error(err));
  }

}