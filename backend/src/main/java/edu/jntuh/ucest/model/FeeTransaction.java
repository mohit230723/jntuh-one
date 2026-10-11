package edu.jntuh.ucest.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "fee_transactions")
public class FeeTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fee_record_id", nullable = false)
    private FeeRecord feeRecord;

    @Column(name = "transaction_ref", nullable = false, unique = true, length = 60)
    private String transactionRef;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "payment_mode", nullable = false, length = 30)
    private String paymentMode = "ONLINE";

    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime transactionDate = LocalDateTime.now();

    @Column(nullable = false, length = 20)
    private String status = "SUCCESS";

    public FeeTransaction() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public FeeRecord getFeeRecord() { return feeRecord; }
    public void setFeeRecord(FeeRecord feeRecord) { this.feeRecord = feeRecord; }

    public String getTransactionRef() { return transactionRef; }
    public void setTransactionRef(String transactionRef) { this.transactionRef = transactionRef; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getPaymentMode() { return paymentMode; }
    public void setPaymentMode(String paymentMode) { this.paymentMode = paymentMode; }

    public LocalDateTime getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDateTime transactionDate) { this.transactionDate = transactionDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
