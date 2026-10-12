package edu.jntuh.ucest.dto;

import java.math.BigDecimal;

public class FeePaymentRequest {
    private BigDecimal amount;
    private String paymentMode = "ONLINE";

    public FeePaymentRequest() {}

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getPaymentMode() { return paymentMode; }
    public void setPaymentMode(String paymentMode) { this.paymentMode = paymentMode; }
}
