import {useState} from "react";
import { useHistory } from "react-router-dom";

import noteService from "../../../services/notes.service";


import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";


const TagsInput = ( props) => {
  const [tags, setTags] = useState([]);
  let history = useHistory();

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      noteService.addTag( props.id, {tags})
      .then((data) => {

      setTags([...tags, event.target.value], {data});
      props.selectedTags([...tags, event.target.value]);
      history.push(`/notes`);

      event.target.value = "";
    })
  }
  }

  return (
    <div className="tags-input">
      <TextField
        type="text"
        onKeyUp={(event) => addTags(event)}
        placeholder="Add tag"
        style={{padding:10}}
      />

      {tags.map((tag, index) => {
        return (
          <Chip
            key={index}
            label={tag}
            onDelete={() => removeTags(index)}
            color="primary"
          />
        );
      })}
    </div>
  );
};

export default TagsInput;
