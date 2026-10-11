package edu.jntuh.ucest.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class FeeTransactionDto {
    private String receiptNo;
    private BigDecimal amount;
    private String paymentDate;
    private String mode;
    private String status;

    public FeeTransactionDto() {}

    public FeeTransactionDto(String receiptNo, BigDecimal amount, String paymentDate, String mode, String status) {
        this.receiptNo = receiptNo;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.mode = mode;
        this.status = status;
    }

    public String getReceiptNo() { return receiptNo; }
    public void setReceiptNo(String receiptNo) { this.receiptNo = receiptNo; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getPaymentDate() { return paymentDate; }
    public void setPaymentDate(String paymentDate) { this.paymentDate = paymentDate; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
