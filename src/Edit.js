import React, { useEffect } from "react";
import "./App.css";
import { connect, useDispatch } from "react-redux";
import { Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import firebase from "./util/firebase";
import {
  saveNaturalData,
  saveMergedArray,
} from "./redux/SaveData/data.actions";

function App({ naturalData }) {
  const dispatch = useDispatch();
  const [todoList, setTodoList] = React.useState();

  useEffect(() => {
    const todoRef = firebase.database().ref("json");
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      setTodoList(todos);
    });
  }, []);

  const [value, setValue] = React.useState(naturalData);
  const [save, setSave] = React.useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const saveJSONData = () => {
    var menu = JSON.parse(value)._embedded.menu_items;
    var categories = [];
    var tempCategories = [];
    var init = 0;

    menu.forEach((item) => {
      item._embedded.menu_categories.forEach((element) => {
        tempCategories[init] = element.name;
        categories[init] = item;
        init++;
      });
    });

    tempCategories = tempCategories.sort();
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

    const todoRef = firebase.database().ref("json");

    todoList
      ? todoRef.update({
          mergedArray,
        })
      : todoRef.set({
          mergedArray,
        });

    // todoRef.update({
    //   mergedArray,
    // });
    dispatch(saveNaturalData({ naturalData: value }));
    dispatch(saveMergedArray({ count: mergedArray }));
    setSave(true);
  };

  return (
    <div className="App">
      <br></br>
      <br></br>
      <br></br>
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
        {save ? "Saved" : "Save"}
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
    naturalData: state.data.naturalData
      ? state.data.naturalData.naturalData
      : [],
  };
};

export default connect(mapStateToProps)(App);
