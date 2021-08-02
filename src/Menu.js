import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import firebase from "./util/firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

function Menu() {
  const classes = useStyles();
  const [todoList, setTodoList] = React.useState();
  useEffect(() => {
    const todoRef = firebase.database().ref("json");
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      setTodoList(todos);
    });
  }, []);
  console.log("todoList", todoList);
  const menu = todoList ? todoList.mergedArray : [];

  return (
    <div className={classes.root}>
      {menu.length ? (
        menu.map((item, index) => (
          <div key={index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{item.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {item.elements.map((element, k) => (
                    <div key={k}>
                      <span style={{ marginRight: "15px" }}>{element.id}</span>
                      <span style={{ marginRight: "15px" }}>
                        {element.name}
                      </span>
                      <span>${element.price / 100}</span>
                    </div>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))
      ) : (
        <div></div>
      )}
      <br></br>
      <br></br>
      <Route>{menu ? <Link to="/">Back</Link> : ""}</Route>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Menu;
