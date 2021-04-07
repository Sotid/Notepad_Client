import React, { useState, useEffect } from "react";
import noteService from "../../services/notes.service";
import { useHistory, useParams } from "react-router-dom";

const Notes = () => {
  const [oneNote, setOneNote] = useState(null);
  const { id } = useParams();
 let history = useHistory()
console.log(oneNote)

  useEffect(() => {
    async function fetchData() {
      setOneNote(await noteService.getNoteById(id));
    }
    fetchData();
  }, []);

 

  return (
    <div>
      {oneNote && (
        <div>
          {oneNote.content}
        </div>
      )}
    
    </div>
  );
};

export default Notes;
