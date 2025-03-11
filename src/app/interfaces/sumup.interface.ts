export interface CreateCheckoutRequest {
    total_amount: {
        value: number;
        currency: string;
        minor_unit: number;
    };
    installments?: number;
    card_type?: 'credit' | 'debit'
    description?: string;
    return_url?:string;
}

export interface CreateCheckoutResponse {
    data: {client_transaction_id:string}
}

export interface CreateReaderRequest {
    pairing_code: string;
    name?: string;
}

export interface CreateReaderResponse {
    id: string;
    name: string;
    merchant_code: string;
    status: string;
}

export interface GetTransactionResponse {
    id: string;
    amount: number;
    currency: string;
    status: string;
    transaction_code: string;
    timestamp: string;
    merchant_code: string;
}

export interface ListTransactionsRequest {
    limit?: number;
    offset?: number;
    start_date?: string;
    end_date?: string;
}

export interface ListTransactionsResponse {
    items: {
        id: string;
        amount: number;
        currency: string;
        status: string;
        transaction_code: string;
        timestamp: string;
        merchant_code: string;
    }[];
    total: number;
}

export interface CreateTokenRequest {
    grant_type: string;
    client_id: string;
    client_secret: string;
    code: string;
    redirect_uri: string;
}

export interface CreateTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

export interface AuthorizeRequest {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    scope: string;
    state: string;
}

export interface AuthorizeResponse {
    code: string;
}