package Service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Model.User;
import Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    public String registerUser(String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return "401: Email already exists.";
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // Encode password here
        user.setVerificationCode(UUID.randomUUID().toString());
        user.setEnabled(false);
        userRepository.save(user);

        return "200: Successfully registered.";
    }

    public boolean verifyUser(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode).orElse(null);
        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setEnabled(true);
            user.setVerificationCode(null);
            userRepository.save(user);
            return true;
        }
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
