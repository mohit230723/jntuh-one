package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.FeeTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeeTransactionRepository extends JpaRepository<FeeTransaction, Long> {
    List<FeeTransaction> findByFeeRecordStudentRollNumberOrderByTransactionDateDesc(String rollNumber);
}
