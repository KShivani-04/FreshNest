package KLU;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"Model"})
@EnableJpaRepositories(basePackages = {"Repository"})
@ComponentScan(basePackages = {"Controller", "Service", "Model", "Repository", "Config"})
public class GroceryStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(GroceryStoreApplication.class, args);
    }
}
