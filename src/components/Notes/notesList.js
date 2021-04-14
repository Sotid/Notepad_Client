import React, { useState, useEffect, useRef } from "react";
import noteService from "../../services/notes.service";
import "../Notes/notesList.css";
import TagsInput from "../Notes/TagsInput";
import ImageUploader from "../Notes/ImageUploader";
import UploadPage from "../Notes/uploadPage";
import Edit from "../Notes/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import clsx from "clsx";
import { Collapse } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// const ThEme = createMuiTheme({
//   typography: {
//     fontFamily: ["Indie Flower", "cursive"].join(","),
//   },
// });

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#118AB2",
      dark: "#073B4C",
    },
    secondary: {
      light: "#FFD166",
      main: "#06D6A0",
      dark: "#EF476F",
    },
  },
  typography: {
    fontSize: 20,
    fontFamily: ["Indie Flower", "cursive"].join(","),
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justify: "space-evenly",
    background: "linear-gradient(45deg, #6b8496 50%, #9dd9d2 90%)",
    paddingTop: 20,
    flexGrow: 1,
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function NotesList() {
  const classes = useStyles();

  const [allNotes, setAllNotes] = useState([]);
  const [hide, setHide] = useState({});
  const [expanded, setExpanded] = useState(false);
  const selectedTags = (tags) => {
    console.log(tags);
  };
  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? -1 : index);
  };

  const history = useHistory();

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
    console.log(e);
    setAllNotes(allNotes.filter((item) => item.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        p={1}
        bgcolor="#67a1b2"
        css={{ maxWidth: 1500, maxHeight: 1500 }}
      >
        <CardContent className={classes.root} variant="outlined">
          {allNotes.map((one, index) => (
            <div className="contain" key={allNotes.id}>
              <div
                style={{
                  backgroundColor: "#fff275",
                  maxHeight: "820px",
                  maxWidth: "250px",
                  minHeight: "250px",
                  minWidth: "150px",
                  borderRadius: 20,
                  paddingTop: 20,
                }}
                className="card"
              >
                <Grid container spacing={13} justify="space-around">
                  <Button
                    color="primary"
                    variant="outlined"
                    style={{ height: 20, width: 15 }}
                    aria-label="edit"
                    style={{ borderRadius: 50 }}
                    onClick={(e) => toggleEdit(index)}
                  >
                    <EditIcon style={{ height: 20, width: 15 }} />
                  </Button>
                  {!!hide[index] && <Edit NoteId={one._id} />}

                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ height: 20, width: 15 }}
                    color="primary"
                    aria-label="delete"
                    style={{ borderRadius: 100 }}
                    onClick={() => deleteNote(one._id)}
                  >
                    <DeleteIcon style={{ height: 20, width: 15 }} />
                  </Button>
                </Grid>
                <TagsInput selectedTags={selectedTags} />

                <CardContent>
                  <Typography variant="h5" component="h2">
                    {one.title}
                  </Typography>
                  <CardActions disableSpacing>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ height: 20, width: 15 }}
                      style={{ borderRadius: 50 }}
                      onClick={(e) => toggleEdit(index)}
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={(e) => handleExpandClick(index)}
                      aria-expanded={expanded === index}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon style={{ height: 20, width: 15 }} />
                    </Button>
                  </CardActions>
                  <Collapse
                    in={expanded === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Typography
                        className={classes.pos}
                        color="textSecondary"
                        paragraph
                      >
                        <UploadPage />

                        {one.content}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </CardContent>
              </div>
            </div>
          ))}
        </CardContent>
      </Box>
    </ThemeProvider>
  );
}

export default NotesList;
