package Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Model.Tracking;
import Repository.TrackingRepository;

@RestController
@RequestMapping("/track")
@CrossOrigin(origins = "*")
public class TrackingController {

    private final TrackingRepository repository;

    public TrackingController(TrackingRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{id}")
    public Tracking getStatus(@PathVariable String id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Tracking ID not found"));
    }

    @PostMapping
    public Tracking createTracking(@RequestBody Tracking track) {
        return repository.save(track);
    }
}
