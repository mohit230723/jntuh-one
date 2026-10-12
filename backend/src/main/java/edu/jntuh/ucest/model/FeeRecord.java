package edu.jntuh.ucest.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fee_records")
public class FeeRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @Column(name = "academic_year", nullable = false, length = 10)
    private String academicYear = "2026-2027";

    @Column(nullable = false)
    private Integer semester = 5;

    @Column(name = "total_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalFee = new BigDecimal("35000.00");

    @Column(name = "paid_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal paidAmount = BigDecimal.ZERO;

    @Column(name = "due_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal dueAmount = new BigDecimal("35000.00");

    @Column(nullable = false, length = 20)
    private String status = "PENDING"; // PAID, PARTIAL, PENDING

    @Column(name = "last_payment_date")
    private LocalDate lastPaymentDate;

    @Column(name = "receipt_number", unique = true, length = 50)
    private String receiptNumber;

    @OneToMany(mappedBy = "feeRecord", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FeeTransaction> transactions = new ArrayList<>();

    public FeeRecord() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public StudentProfile getStudent() { return student; }
    public void setStudent(StudentProfile student) { this.student = student; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public BigDecimal getTotalFee() { return totalFee; }
    public void setTotalFee(BigDecimal totalFee) { this.totalFee = totalFee; }

    public BigDecimal getPaidAmount() { return paidAmount; }
    public void setPaidAmount(BigDecimal paidAmount) { this.paidAmount = paidAmount; }

    public BigDecimal getDueAmount() { return dueAmount; }
    public void setDueAmount(BigDecimal dueAmount) { this.dueAmount = dueAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getLastPaymentDate() { return lastPaymentDate; }
    public void setLastPaymentDate(LocalDate lastPaymentDate) { this.lastPaymentDate = lastPaymentDate; }

    public String getReceiptNumber() { return receiptNumber; }
    public void setReceiptNumber(String receiptNumber) { this.receiptNumber = receiptNumber; }

    public List<FeeTransaction> getTransactions() { return transactions; }
    public void setTransactions(List<FeeTransaction> transactions) { this.transactions = transactions; }
}
