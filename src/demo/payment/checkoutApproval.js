export function createCheckoutApprovalRequest({ orderId, amount, currency = "KRW" }) {
  return {
    type: "checkout-approval",
    orderId,
    amount,
    currency,
    requestedAt: new Date().toISOString()
  };
}
