package notes_server.example.notes_server.Service;

import notes_server.example.notes_server.Model.Notes;
import notes_server.example.notes_server.Repository.NotesRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotesService {
    private final NotesRepository notesRepository;

    public NotesService(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    public List<Notes> getNotesByUser(String user) {
        return notesRepository.findByUser(user);
    }

    public Notes addNote(Notes note) {
        return notesRepository.save(note);
    }

    public Notes updateNote(String id, Notes updatedNote) {
        Notes existing = notesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        existing.setHeader(updatedNote.getHeader());
        existing.setBody(updatedNote.getBody());
        return notesRepository.save(existing);
    }

    public void deleteNote(String id) {
        notesRepository.deleteById(id);
    }
}
