package Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationCode(String code);
}
