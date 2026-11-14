export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  currency: string
  receipt: string
  status: string
  notes?: Record<string, string>
  offer_id?: string
  offer_applied?: boolean
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  customer_id?: string
  refered_by?: string
  invoice_id?: string
  invoice_id_amount?: string
  notes_object?: Record<string, string>
  legal_documents?: Record<string, string>
  created_at?: number
  ordered_at?: string
}

export interface RazorpayPayment {
  entity: string
  id: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  status: string
  description: string
  reference_id?: string
  invoice_id?: string
  international?: boolean
  method: string
  account_id?: string
  card_id?: string
  wallet: string
  vpa?: string
  bank?: string
  failed?: boolean
  error_code?: string
  error_description?: string
  error_source?: string
  error_step?: string
  fee?: number
  tax: number
  digital?: boolean
  contact?: string
  order_id?: string
  invoice_currency?: string
  invoice_amount?: number
  private_attached_receipt?: boolean
  been_refunded?: boolean
  refund_status?: string
  uppercased_invoice_id?: string
  created_at?: number
  paid_at?: string
  updated_at?: number
  uuid?: string
  error?: string
  acquirer_data?: string
  card?: Record<string, any>
  issuer?: Record<string, any>
  bank_name?: string
  bank_code?: string
  bayes_factor?: string
  issuer_country?: string
  issuer_name?: string
  last_two?: string
  auth_code?: string
  avs_result?: Record<string, any>
  customer_vpc_response?: string
  response_parameters?: Record<string, any>
  card_category?: string
  ipn_status?: string
  statement_descriptor?: string
  md?: string
  capture_status?: string
}

export interface RazorpayWebhookEvent {
  event: string
  data: {
    object: {
      entity: string
      id: string
      amount: number
      amount_refunded: number
      currency: string
      status: string
      created_at: number
      description: string
      order_id?: string
      invoice_id?: string
      international: boolean
      method: string
      card_id: string
      bank: string
      wallet: string
      vpa: string
      failed: boolean
      error_code: string
      error_description: string
      error_source: string
      error_step: string
      merchant_code: string
      refund_status: string
      uuid: string
    }
  }
}

export interface PaymentWebhookEvent {
  event_type: string
  payload: Record<string, any>
  timestamp: string
  signature: string
}
