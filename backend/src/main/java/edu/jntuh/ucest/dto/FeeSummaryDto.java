package edu.jntuh.ucest.dto;

import java.math.BigDecimal;
import java.util.List;

public class FeeSummaryDto {
    private BigDecimal totalAcademicFee;
    private BigDecimal amountPaid;
    private BigDecimal pendingDue;
    private String status;
    private List<FeeTransactionDto> transactions;

    public FeeSummaryDto() {}

    public FeeSummaryDto(BigDecimal totalAcademicFee, BigDecimal amountPaid, BigDecimal pendingDue, String status, List<FeeTransactionDto> transactions) {
        this.totalAcademicFee = totalAcademicFee;
        this.amountPaid = amountPaid;
        this.pendingDue = pendingDue;
        this.status = status;
        this.transactions = transactions;
    }

    public BigDecimal getTotalAcademicFee() { return totalAcademicFee; }
    public void setTotalAcademicFee(BigDecimal totalAcademicFee) { this.totalAcademicFee = totalAcademicFee; }

    public BigDecimal getAmountPaid() { return amountPaid; }
    public void setAmountPaid(BigDecimal amountPaid) { this.amountPaid = amountPaid; }

    public BigDecimal getPendingDue() { return pendingDue; }
    public void setPendingDue(BigDecimal pendingDue) { this.pendingDue = pendingDue; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<FeeTransactionDto> getTransactions() { return transactions; }
    public void setTransactions(List<FeeTransactionDto> transactions) { this.transactions = transactions; }
}
