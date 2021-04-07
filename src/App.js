import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "fontsource-roboto";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Notes from "./components/Notes/Notes";
import Form from "./components/Home/Form";
import Edit from "./components/Notes/Edit";
import NotesList from "./components/Notes/notesList";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        {/* <NotesList /> */}
        <Switch>
          <Route exact path="/notes" component={Home} />

          <Route exact path="/notes/add" component={Form} />
          <Route exact path="/notes/:id" component={Notes} />
          <Route exact path="/notes/edit/:id" component={Edit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
