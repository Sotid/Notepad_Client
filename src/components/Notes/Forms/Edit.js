import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import noteService from "../../../services/notes.service";
import TextField from "@material-ui/core/TextField";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import Button from "@material-ui/core/Button";

const Edit = ({ NoteId }) => {
  const [state, setState] = useState({ title: "", content: "" });

  let history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, content } = state;

    noteService
      .updateNote(NoteId, { title, content })

      .then((data) => {
        history.push(`/`);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <TextField
          id="outlined-secondary"
          label="Title"
          variant="outlined"
          color="secondary"
          key="field1"
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
        />

        <TextField
          id="outlined-secondary"
          label="Content"
          variant="outlined"
          color="secondary"
          key="field2"
          name="content"
          value={state.content}
          onChange={handleChange}
        />

        <Button
          color="primary"
          variant="outlined"
          style={{ height: 30, width: 15, borderRadius: 50 }}
          aria-label="edit"
          onClick={handleFormSubmit}
        >
          {" "}
          <SaveRoundedIcon style={{ height: 20, width: 15 }} />
        </Button>
      </form>
    </div>
  );
};

export default Edit;
