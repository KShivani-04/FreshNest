package Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Model.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
}
