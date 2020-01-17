import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dealerCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: theme.spacing(2)
  },
  avatar: {
    width: 50,
    height: 50
  },
  score: {
    margin: 10,
    color: "white"
  },
}));

const ParticipantPanel = props => {
  const {participantPanelTitle, ...other} = props;

  const classes = useStyles();

  return (
    <div className={classes.dealerCard}>
      <Avatar
        {...other}
        className={classes.avatar}
      />
      <Typography 
        variant="h6"
        gutterBottom
        className={classes.score}
      >
        {participantPanelTitle}
      </Typography>
    </div>
  );
}

export default ParticipantPanel;
