import React, { useState, useEffect, useCallback } from "react";
import noteService from "../../services/notes.service";
import "../Notes/notesList.css";
import Edit from "../Notes/Edit";
import Form from "../Home/Form";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function NotesList() {
  const classes = useStyles();

  const [allNotes, setAllNotes] = useState([]);
  const [hidden, setHidden] = useState({});
  const [hide, setHide] = useState({});
  let history = useHistory();

  // const completeNote = index => {

  //   const newNote = [...allNotes];
  //   newNote[index].completed = true;
  //   // setAllNotes(newNote);
  //   console.log(newNote)
  // };

  const toggleHide = (index) => {
    setHidden({ ...hidden, [index]: !hidden[index] });
  };

  const toggleEdit = (index) => {
    setHide({ ...hide, [index]: !hide[index] });
  };

  useEffect(() => {
    noteService.getAllNotes().then((data) => {
      setAllNotes(data);
    });
  }, [allNotes._id]);

  const deleteNote = (e) => {
    console.log(e);
    noteService.deleteNote(e);
    const id = e;
    setAllNotes(allNotes.filter((item) => item.id !== id));
  };
  console.log(allNotes)

  const updateStatus = (id) => {

    let allItems = allNotes.map((item) => {
      if (item.id === id) {
        item.completed = true;

      }
      return item;
    });
    setAllNotes(allItems);

  };

  return (
    <div className="contain" key={allNotes.id}>

    
      <Card className={classes.root} variant="outlined">
      <CardContent />
    
          {allNotes.map((one, index) => (
            <div style={{ backgroundColor: "#e8eaf6" }} className="card">
              <Fab
                size="small"
                color="secondary"
                aria-label="edit"
                onClick={(e) => toggleEdit(index)}
              >
                {" "}
                <EditIcon />
              </Fab>
              {!!hide[index] && (
                <span>
                  <Edit />
                </span>
              )}
              <Fab
                size="small"
                aria-label="delete"
                color="primary"
                onClick={() => deleteNote(one._id)}
              >
                <DeleteIcon />
              </Fab>

              <Typography variant="h5" component="h2">
                {one.title}
              </Typography>
              <Fab
                color="primary"
                aria-label="add"
                color="secondary"
                size="small"
                onClick={(e) => toggleHide(index)}
              >
                <ExpandMoreIcon />
              </Fab>
              <Typography className={classes.pos} color="textSecondary">
                {!hidden[index] && <span>{one.content}</span>}
              </Typography>

              {/* <button onClick={() => completeNote(index)}>Complete</button> */}
            </div>
          ))}
          </Card>
          </div>

  );
}

export default NotesList;
