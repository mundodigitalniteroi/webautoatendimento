export interface Comprovante {
  card: {
    last_4_digits: string;
    type: string;
  };
  id: string;
  amount: number;
  process_as: string;
  products: {
    name: string;
    quantity: number;
    total_price: number;
  }[];
  installments_count: number;
  local_time: Date;
  transaction_code: string;
}

