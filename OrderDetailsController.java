package Controller;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Model.OrderDetails;
import Repository.OrderDetailsRepository;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class OrderDetailsController {

    private final OrderDetailsRepository repository;

    public OrderDetailsController(OrderDetailsRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<OrderDetails> getOrders() {
        return repository.findAll();
    }

    @PostMapping
    public OrderDetails placeOrder(@RequestBody OrderDetails order) {
        order.setOrderDate(new Date());
        order.setStatus("Processing");
        return repository.save(order);
    }
}
