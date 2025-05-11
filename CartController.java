package Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Model.CartItem;
import Repository.CartItemRepository;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartItemRepository repository;

    public CartController(CartItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<CartItem> getCart() {
        return repository.findAll();
    }

    @PostMapping
    public CartItem addToCart(@RequestBody CartItem item) {
        return repository.save(item);
    }

    @DeleteMapping("/{id}")
    public void removeItem(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public CartItem updateQuantity(@PathVariable Long id, @RequestBody CartItem item) {
        item.setId(id);
        return repository.save(item);
    }

    @DeleteMapping("/clear")
    public void clearCart() {
        repository.deleteAll();
    }
}
