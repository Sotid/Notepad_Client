import React, { useState, useEffect } from "react";

import noteService from "../../../services/notes.service";
import Edit from "../Forms/Edit";
import TagsInput from "../TagsInput/TagsInput";
import Page from "../../Cloudinary/CloudinaryUpload";
import "../NotesList/notesList.css";

import { makeStyles,createMuiTheme,ThemeProvider,} from "@material-ui/core/styles";
import { Grid, Collapse } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import clsx from "clsx";

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


  const toggleEdit = (index) => {
    setHide({ ...hide, [index]: !hide[index] });
  };



  useEffect(() => {
    noteService.getAllNotes().then((data) => {
      setAllNotes(data);
    });
  }, [allNotes]);


  const deleteNote = (e) => {
    console.log(e);
    noteService.deleteNote(e);
    const id = e;
    setAllNotes(allNotes.filter((item) => item.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        p={1}
        bgcolor="#67a1b2"
        css={{ maxWidth: 1500, maxHeight: 3500 }}
      >
        <CardContent className={classes.root} variant="outlined">
          {allNotes.map((one, index) => (
            <div className="contain" key={allNotes.id}>
              <div
                style={{
                  backgroundColor: "#fff275",
                  maxHeight: "2020px",
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
                    style={{ height: 30, width: 15, borderRadius: 50 }}
                    aria-label="edit"
                    onClick={(e) => toggleEdit(index)}
                  >
                    <EditIcon style={{ height: 20, width: 15 }} />
                  </Button>
                  {!!hide[index] && <Edit NoteId={one._id} />}

                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ height: 30, width: 15, borderRadius: 50 }}
                    aria-label="delete"
                    onClick={() => deleteNote(one._id)}
                  >
                    <DeleteIcon style={{ height: 20, width: 15 }} />
                  </Button>
                </Grid>
                <TagsInput selectedTags={selectedTags} id={one._id} />

                <CardContent>
                  <Typography variant="h5" component="h2">
                    {one.title}
                  </Typography>
                  <CardActions disableSpacing>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ height: 30, width: 15, borderRadius: 50 }}
                  
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
                        <Page />

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
