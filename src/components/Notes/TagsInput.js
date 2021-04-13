import React from "react";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

const TagsInput = (props) => {
  const [tags, setTags] = React.useState([]);

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

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
