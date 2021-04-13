import React, { useEffect, useState } from "react";
import useInput from "../../customHook/useInput";
import NotesList from "../Notes/notesList";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const Form = () => {
  const refresh = () => {
    window.location.reload();
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "35ch",
        paddingLeft: 100,
      },
    },
  }));

  const classes = useStyles();

  const { values, handleInputsChange, handleSubmit } = useInput();

  return (
    <div className="section">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div class="input-field">
          <TextField
            id="standard-multiline-flexible"
            label="Title"
            style={{ paddingLeft: "3px" }}
            multiline
            rowsMax={4}
            i
            type="text"
            name="title"
            onChange={handleInputsChange}
            value={values.title}
          />

          <div className="input-field">
            <TextField
              id="outlined-multiline-static"
              label="Write your note"
              variant="outlined"
              style={{ paddingLeft: "10px" }}
              multiline
              rows={3}
              name="content"
              onChange={handleInputsChange}
              value={values.content}
            />
          </div>
        </div>
        <Button
          variant="contained"
          onClick={refresh}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add{" "}
        </Button>
      </form>
    </div>
  );
};

export default Form;
