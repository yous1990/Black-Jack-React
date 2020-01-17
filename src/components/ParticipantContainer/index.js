import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from '@material-ui/core/Badge';

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

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const ParticipantPanel = props => {
  const {participantPanelTitle, turn, ...other} = props;

  const classes = useStyles();

  return (
    <div className={classes.dealerCard}>
      {
        turn
        ? <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar
              {...other}
              className={classes.avatar}
            />
          </StyledBadge>
        
        : <Avatar
            {...other}
            className={classes.avatar}
          />
      }
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
