import { PaymentSummary } from "./paymentSummary";

export interface CreateOrder {
    price: number,
    paymentIntentId: string,
    paymentSummary: PaymentSummary
}