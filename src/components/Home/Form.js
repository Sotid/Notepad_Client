import React, {useEffect, useState} from "react";
import useInput from "../../customHook/useInput";
import NotesList from "../Notes/notesList"
import { Link } from "react-router-dom";

const Form = () => {


const refresh = () => {
  window.location.reload()
}


const {values, handleInputsChange, handleSubmit} = useInput();

  return (
    <div className="section">
  

      <form onSubmit={handleSubmit} >
        <div class="input-field">
          <input id="note-title" type="text" name="title" class="validate" onChange= {handleInputsChange} value= {values.title} />

          <label class="active" htmlFor="note-title">
            Title
          </label>
          <div className="input-field">
            <label htmlFor="note-content">Write your note</label>
            <textarea
              id="note-content"
              name="content"
              onChange= {handleInputsChange}
              value= {values.content}            ></textarea>
          </div>
        </div>
        <button onClick= {refresh}  type="submit" variant="contained" color="primary" >
        
Add        </button>

      </form>


    </div>
  
  );
};

export default Form;
