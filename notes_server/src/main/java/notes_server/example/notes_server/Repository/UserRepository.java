package notes_server.example.notes_server.Repository;



import notes_server.example.notes_server.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUserName(String userName);
}
