package notes_server.example.notes_server.Controller;

import notes_server.example.notes_server.Model.Notes;
import notes_server.example.notes_server.Service.NotesService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")


public class NotesController {
    private final NotesService notesService;

    public NotesController(NotesService notesService) {
        this.notesService = notesService;
    }

    // Get notes by user
    @GetMapping("/{user}")
    public List<Notes> getNotes(@PathVariable String user) {
        return notesService.getNotesByUser(user);
    }

    // Add new note
    @PostMapping
    public Notes addNote(@RequestBody Notes note) {
        return notesService.addNote(note);
    }

    // Update note
    @PutMapping("/{id}")
    public Notes updateNote(@PathVariable String id, @RequestBody Notes updatedNote) {
        return notesService.updateNote(id, updatedNote);
    }

    // Delete note
    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable String id) {
        notesService.deleteNote(id);
    }
}
