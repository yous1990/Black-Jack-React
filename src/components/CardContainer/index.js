import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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

  const { cards, checked, loading } = props;

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
