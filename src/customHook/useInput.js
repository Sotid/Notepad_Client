import { useState } from "react";
import noteService from "../services/notes.service";

const useInput1 = () => {
  const [values, setValues] = useState({ title: "", content: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, content } = values;

    noteService.addNote({ title, content }).then(() => {
      setValues({ title: "", content: "" });
    });
  };

  const handleInputsChange = (event) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return {
    handleSubmit,
    handleInputsChange,
    values,
  };
};

export default useInput1;
