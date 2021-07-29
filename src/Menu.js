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

function Menu({ count }) {
  const classes = useStyles();

  var menu = count ? count : [];
  console.log("count", menu);
  // console.log("menu", menu);

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
                  {
                    item.elements.map((element, k) => (
                      <div key={k}>
                        <span style={{ marginRight: "15px" }}>
                          {element.id}
                        </span>
                        <span style={{ marginRight: "15px" }}>
                          {element.name}
                        </span>
                        <span>${element.price / 100}</span>
                      </div>
                    ))
                    // item.elements.map((element, index) => (
                    //     <p>{element.id}</p>
                    //     <p>{element.name}</p>
                    //     <p>{element.price}</p>
                    // ))
                  }

                  {/* <p>{item.name}</p>
                  <p>{item.id}</p>
                  <p>${item.price_per_unit / 100}</p> */}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))
      ) : (
        <div>
          <p>Empty</p>
        </div>
      )}
      <br></br>
      <br></br>
      <Route>
        <Link to="/">Back</Link>
      </Route>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.counter.count ? state.counter.count.count : {},
  };
};

export default connect(mapStateToProps)(Menu);
