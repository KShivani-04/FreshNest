package Controller;

import Model.Product;
import Repository.ProductRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        productRepository.save(product);
        return ResponseEntity.ok("Product saved successfully");
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
