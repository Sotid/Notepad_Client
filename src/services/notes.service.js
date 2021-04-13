import axios from "axios";

class NoteService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
    });
  }

  getAllNotes() {
    return this.api.get(`/notes`).then(({ data }) => data);
  }

  getNoteById(id) {
    return this.api.get(`notes/${id}`).then(({ data }) => data);
  }

  addNote(newNote) {
    return this.api.post(`/notes/add`, newNote).then(({ data }) => data);
  }

  updateNote(id, noteData) {
    console.log(noteData);
    console.log(id);
    return this.api.put(`/notes/edit/${id}`, noteData).then(({ data }) => data);
  }

  deleteNote(id) {
    return this.api.delete(`/notes/${id}`).then(({ data }) => data);
  }
}

let noteService = new NoteService();

export default noteService;
