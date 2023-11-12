package opp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import opp.model.Recept;

import java.util.Optional;

public interface ReceptRepository extends JpaRepository<Recept, Long> {
    Optional<Recept> findByIDRecept(Long id);
    int countByIDRecept(Long id);
    boolean existsByIDRecept(Long id);
}
