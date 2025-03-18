import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Comprovante } from 'src/app/interfaces/comprovante.interface';
import {
  AuthorizeRequest,
  CreateCheckoutRequest,
  CreateCheckoutResponse,
  CreateReaderRequest,
  CreateReaderResponse,
  GetTransactionResponse,
  ListTransactionsRequest,
  ListTransactionsResponse,
  CreateTokenResponse,
} from 'src/app/interfaces/sumup.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SumupIntegracaoService {
  private baseUrl = environment.urlApiSumup;
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;
  private redirectUri = environment.redirectUri;
  private merchantCode = environment.merchantCode;
  private urlReturnPayment = environment.urlReturnPayment;
  constructor(private inAppBrowser: InAppBrowser) {}

  // Obtém o token de autorização do localStorage
  private getAuthHeaders(): { [key: string]: string } {
    const authModel = JSON.parse(localStorage.getItem('authModel') || '{}');
    return {
      'Authorization': `Bearer ${authModel.access_token || 'SEU_ACCESS_TOKEN_DEFAULT'}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  // Faz requisições com retry automático em caso de 401 usando refresh_token
  private async fetchWithTokenRefresh(url: string, options: RequestInit): Promise<any> {
    let response = await fetch(url, {
      ...options,
      headers: this.getAuthHeaders(),
    });

    if (response.status === 401 || response.status === 404) {
      // Token expirado, tenta atualizar com refresh_token
      const authModel = JSON.parse(localStorage.getItem('authModel') || '{}');
      if (!authModel.refresh_token) {
        throw new Error('Refresh token não encontrado no localStorage');
      }

      const newToken = await this.refreshToken(authModel.refresh_token);
      localStorage.setItem('authModel', JSON.stringify(newToken)); // Atualiza o authModel no localStorage

      // Repete a requisição com o novo token
      response = await fetch(url, {
        ...options,
        headers: this.getAuthHeaders(),
      });
    }

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  }

  // Atualiza o token usando o refresh_token
  private async refreshToken(refreshToken: string): Promise<CreateTokenResponse> {
    const url = `${this.baseUrl}/token`;
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);
    body.set('refresh_token', refreshToken);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar token: ${response.status} - ${response.statusText}`);
    }

    const data: CreateTokenResponse = await response.json();
    const authModel = { ...data, expires_at: Date.now() / 1000 + data.expires_in };
    return authModel;
  }

  // Abre a URL de autorização no InAppBrowser
  authorize(): void {
    const scopes =
      'transactions.history user.app-settings user.profile_readonly email profile user.profile user.subaccounts user.payout-settings products invoices.read invoices.write accounting.read accounting.write readers.read readers.write payments payment_instruments';
    const request: AuthorizeRequest = {
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: scopes,
      state: '2cFCsY36y95lFHk4',
    };
    const params = new URLSearchParams({
      response_type: request.response_type,
      client_id: request.client_id,
      redirect_uri: request.redirect_uri,
      scope: request.scope,
      state: request.state,
    });
    const authUrl = `${this.baseUrl}/authorize?${params.toString()}`;
    console.log('Abrindo URL de autorização:', authUrl);

    const browser = this.inAppBrowser.create(authUrl, '_blank');
    browser.on('loadstart').subscribe((event) => {
      const url = new URL(event.url);
      if (url.host === 'callback' && url.protocol === 'sumupmobile:') {
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');
        console.log('Code:', code);
        console.log('State:', state);
        browser.close();
      }
    });
  }



  // POST /v0.1/merchants/{merchant_code}/readers/{reader_code}/checkout
  async createCheckout(request: CreateCheckoutRequest, reader_code: string) {
    const url = `${this.baseUrl}/v0.1/merchants/${this.merchantCode}/readers/${reader_code}/checkout`;
    console.log('URL:', url);
  
    const initialResponse = await this.fetchWithTokenRefresh(url, {
      method: 'POST',
      body: JSON.stringify(request),
    });
    const clientTransactionId = initialResponse.data.client_transaction_id;
    localStorage.setItem('client_transaction_id', clientTransactionId);
    return clientTransactionId;
    
  }

  // POST /v0.1/merchants/{merchant_code}/readers
  async createReader(request: CreateReaderRequest): Promise<CreateReaderResponse> {
    const url = `${this.baseUrl}/v0.1/merchants/${this.merchantCode}/readers`;
    console.log(url);
    console.log(request);

    const data = await this.fetchWithTokenRefresh(url, {
      method: 'POST',
      body: JSON.stringify(request),
    });
    console.log("data",data)
    return data;
  }

  // GET /v0.1/transactions/{transaction_id}
  async getTransaction(transactionId: string) {
    const url = `${this.baseUrl}/v2.1/merchants/${this.merchantCode}/transactions?client_transaction_id=${transactionId}`;
    const data = await this.fetchWithTokenRefresh(url, {
      method: 'GET',
    });
    console.log("data",data)
    const comprovante: Comprovante = {
      card: {
        last_4_digits: data.payment_instrument?.last_4_digits || '',
        type: data.payment_instrument?.type || '',
      },
      id: data.id || '',
      amount: data.amount || 0,
      process_as: data.payment_type || '',
      products: data.products?.map(product => ({
        name: product.name || '',
        quantity: product.quantity || 1,
        total_price: product.price || 0
      })) || [],
      installments_count: data.installments_count || 1,
      local_time: new Date(data.timestamp || Date.now()),
      transaction_code: data.transaction_code || transactionId
    };
    
    return comprovante;
  }

  // GET /v0.1/transactions
  async listTransactions(request: ListTransactionsRequest): Promise<ListTransactionsResponse> {
    const params = new URLSearchParams();
    if (request.limit) params.set('limit', request.limit.toString());
    if (request.offset) params.set('offset', request.offset.toString());
    if (request.start_date) params.set('start_date', request.start_date);
    if (request.end_date) params.set('end_date', request.end_date);

    const url = `${this.baseUrl}/v0.1/transactions${params.toString() ? '?' + params.toString() : ''}`;
    const data = await this.fetchWithTokenRefresh(url, {
      method: 'GET',
    });
    return data;
  }

  // POST /token
  async createToken(request: { grant_type: string, code: string }): Promise<CreateTokenResponse> {
    const url = `${this.baseUrl}/token`;
    const body = new URLSearchParams();
    body.set('grant_type', request.grant_type);
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);
    body.set('code', request.code);
    body.set('redirect_uri', this.redirectUri);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const data: CreateTokenResponse = await response.json();
    const authModel = { ...data, expires_at: Date.now() / 1000 + data.expires_in };
    localStorage.setItem('authModel', JSON.stringify(authModel)); // Salva automaticamente o token
    return authModel;
  }
}