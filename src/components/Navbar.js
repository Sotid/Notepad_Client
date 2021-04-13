import React, { useState } from "react";
import Form from "../components/Home/Form";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 150,
  },
  list: {
    marginBottom: theme.spacing(1),
  },

  appBar: {
    top: "auto",
    bottom: 0,
    paddingBottom: 10,
    background: "linear-gradient(45deg, #c49ee6 30%, #7d4d75 90%)",
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "relative",
    zIndex: 1,
    top: 10,
    left: 0,
    right: 0,
    margin: "0 auto",
    borderRadius: 60,
  },
}));

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
});
const Navbar = () => {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);

  return (
    <ThemeProvider>
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Button
              variant="contained"
              onClick={() => setVisible(!visible)}
              aria-label="add"
              className={classes.fabButton}
              color="primary"
            >
              <AddIcon />
              {!visible ? "" : ""}
            </Button>
            {visible && (
              <p>
                <Form />
              </p>
            )}
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
};

export default Navbar;
