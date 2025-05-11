package Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
