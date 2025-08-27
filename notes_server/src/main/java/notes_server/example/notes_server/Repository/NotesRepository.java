package notes_server.example.notes_server.Repository;

import notes_server.example.notes_server.Model.Notes;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NotesRepository extends MongoRepository<Notes, String> {
    List<Notes> findByUser(String user);
}