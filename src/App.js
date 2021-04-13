import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "fontsource-roboto";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Notes from "./components/Notes/Notes";
import Form from "./components/Home/Form";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/notes" component={Home} />

          <Route exact path="/notes/add" component={Form} />
          <Route exact path="/notes/:id" component={Notes} />
          <Route exact path="/notes/edit/:id" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
