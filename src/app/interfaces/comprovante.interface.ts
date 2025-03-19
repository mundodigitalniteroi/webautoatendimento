export interface Comprovante {
  card: {
    last_4_digits: string;
    type: string;
  };
  id: string;
  amount: number;
  auth_code: string;
  process_as: string;
  installments_count: number;
  local_time: Date;
  transaction_code: string;
}

