import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Form from "./components/Notes/Forms/Add";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/notes/add" component={Form} />
          <Route exact path="/notes/edit/:id" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
