package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.FeeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface FeeRecordRepository extends JpaRepository<FeeRecord, Long> {
    Optional<FeeRecord> findByStudentRollNumber(String rollNumber);
    Optional<FeeRecord> findByStudentUserUsername(String username);

    @Query("SELECT COALESCE(SUM(f.paidAmount), 0) FROM FeeRecord f")
    BigDecimal sumTotalFeeCollected();
}
