import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: 'center',
    paddingLeft: 55
  },
  paper: {
    marginLeft: -50
  }
}));

export default function CardContainer(props) {
  const classes = useStyles();

  const { cards, checked} = props;

  return (
    <div className={classes.root}>
      {cards.map((card, index) => {
        return (
          <Slide
            in={checked}
            direction="down"
            mountOnEnter
            unmountOnExit
            key={index}
          >
            <img
              alt={card.suit}
              elevation={0}
              className={classes.paper}
              style={{ width: 90, height: 140 }}
              key={index}
              src={card.image}
            />
          </Slide>
        );
      })}
    </div>
  );
}
