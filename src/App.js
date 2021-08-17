import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Edit from "./Edit";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Edit} />
          <Route path="/menu" component={Menu} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
