import React from "react";

import "./App.css";

import { connect, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import firebase from "./util/firebase";
import {
  increaseCounter,
  decreaseCounter,
} from "./redux/Counter/counter.actions";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  root1: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function App({ count, naturalData }) {
  // console.log("count", count);
  // console.log("naturalData", naturalData);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(naturalData);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const saveJSONData = () => {
    var menu = JSON.parse(value)._embedded.menu_items;
    var categories = [];
    var tempCategories = [];
    var init = 0;
    menu.map((item, index) => {
      item._embedded.menu_categories.map((element, j) => {
        tempCategories[init] = element.name;
        categories[init] = item;
        init++;
      });
    });
    var uniqueCategories = [...new Set(tempCategories)];
    // console.log("uniqueCategories", uniqueCategories);

    const tempItems = categories.map((obj, i) => {
      return {
        id: tempCategories[i],
        elements: [{ id: obj.id, name: obj.name, price: obj.price_per_unit }],
      };
    });

    const arrayHashmap = tempItems.reduce((obj, item) => {
      obj[item.id]
        ? obj[item.id].elements.push(...item.elements)
        : (obj[item.id] = { ...item });
      return obj;
    }, {});

    const mergedArray = Object.values(arrayHashmap);
    console.log("mergedArray", mergedArray);

    // const todoRef = firebase.database().ref("json");
    // const todo = {
    //   mergedArray,
    // };
    // todoRef.push(todo);

    const todoRef = firebase.database().ref("json");
    todoRef.update({
      mergedArray,
    });

    dispatch(decreaseCounter({ count: mergedArray }));
    dispatch(increaseCounter({ naturalData: value }));
  };

  return (
    <div className="App">
      <br></br>
      <br></br>
      <br></br>
      {/* {console.log("value", value)} */}
      <textarea rows="40" style={{ width: "80%" }} onChange={handleChange}>
        {value ? value : {}}
      </textarea>
      <br></br>
      <br></br>
      <Button
        variant="contained"
        color="primary"
        onClick={() => saveJSONData()}
      >
        Save
      </Button>
      <br></br>
      <br></br>

      <Route>
        <Link to="/menu">Go to Menu</Link>
      </Route>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.counter.count ? state.counter.count.count : [],
    naturalData: state.counter.naturalData
      ? state.counter.naturalData.naturalData
      : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),

    decreaseCounter: () => dispatch(decreaseCounter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
