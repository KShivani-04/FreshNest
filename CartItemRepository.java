package Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
