import React from "react";

import "./App.css";

import { connect, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  increaseCounter,
  decreaseCounter,
} from "./redux/Counter/counter.actions";

import Menu from "./Menu";
import Edit from "./Edit";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function App(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const saveJSONData = () => {
    console.log("value", value);

    dispatch(decreaseCounter({ count: value }));
  };

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

const mapStateToProps = (state) => {
  return {
    count: state.counter.count ? state.counter.count.count : {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),
    decreaseCounter: () => dispatch(decreaseCounter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
