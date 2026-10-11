package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("SELECT n FROM Notice n WHERE n.archived = false " +
           "AND (:category IS NULL OR :category = '' OR n.category = :category) " +
           "AND (:search IS NULL OR :search = '' OR LOWER(n.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(n.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY n.pinned DESC, n.postedDate DESC")
    Page<Notice> searchNotices(@Param("category") String category, @Param("search") String search, Pageable pageable);

    Page<Notice> findByArchivedFalseOrderByPinnedDescPostedDateDesc(Pageable pageable);
    
    Page<Notice> findByArchivedFalseAndCategoryOrderByPinnedDescPostedDateDesc(String category, Pageable pageable);
    
    List<Notice> findTop5ByArchivedFalseOrderByPinnedDescPostedDateDesc();

    long countByArchivedFalse();
}
