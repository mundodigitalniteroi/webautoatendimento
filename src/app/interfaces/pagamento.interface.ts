export interface CartaoRequest{
    bandeira: Bandeira,
    numeroCartao:string,
    codigoAutorizacao:string
}

export enum Bandeira{
    AmericanExpress=1,
	Diners=2,
	Hipercard=3,
	MasterCard=4,
	Visa=5,
	Elo=6
}