import React, { useState} from "react";
import {  useHistory} from "react-router-dom";
import noteService from "../../services/notes.service";
import notesList from "./notesList";
import TextField from '@material-ui/core/TextField';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import Fab from "@material-ui/core/Fab";

const Edit = () => {
  const [state,setState] = useState({title: "", content: ""})
  let history = useHistory();
 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const {title,content}= state
console.log(state.title)
    
    noteService
      .updateNote( { title, content })
       .then(() => {
       console.log(state)
         history.push("/notes")
      })
      .catch((err) => console.log(err));

    }

  const handleChange = (event) => {

    setState({...state,[event.target.name]: event.target.value})
console.log(state.title)
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

        <Fab onClick={handleFormSubmit} size="small" color="primary"> <SaveRoundedIcon /></Fab>
      </form>
    </div>
  );
};

export default Edit;
