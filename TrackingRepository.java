package Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Model.Tracking;

public interface TrackingRepository extends JpaRepository<Tracking, String> {
}
