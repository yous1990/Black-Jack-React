import React, { useEffect } from "react";
import useDataApi from "./customHook";
import initialState from "./store/initialState";
import "./App.css";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardContainer from "./components/CardContainer";

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
  app: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  dealerButton: {
    margin: theme.spacing(2)
  },
  dealerCardsContainer: {
    border: "1px solid white",
    width: "90%",
    height: "160px",
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    overflowX: 'auto'
  }
}));

function App() {
  const [state, dispatch, getNewCard, getNewDeck] = useDataApi(initialState);

  const [checked, setChecked] = React.useState(false);

  const classes = useStyles();

  console.log("loading??", state.loading);
  return (
    <div className={classes.app}>
      <div className={classes.dealerCard}>
        <Avatar
          className={classes.avatar}
          alt="dealer"
          src="https://c8.alamy.com/comp/K035CA/live-dealer-single-flat-icon-on-white-background-vector-illustration-K035CA.jpg"
        />
        <Typography variant="h6" gutterBottom className={classes.score}>
          Dealer Score: {state.dealerTotal}
        </Typography>
      </div>
      <button onClick={() => {
        getNewDeck()
        dispatch({
          type: 'REINIT_ALL',
          payload: initialState
        })
      }}>replay</button>
      <div>
        {!state.player1Turn && (
          <Button
            size="medium"
            variant="contained"
            className={classes.dealerButton}
            onClick={() => {
              dispatch({
                type: "UPDATE_PLAYER1_TURN",
                payload: false
              });
              getNewCard("bank");
              setChecked(true);
            }}
          >
            Dealer prend une carte
          </Button>
        )}
      </div>
      <div className={classes.dealerCardsContainer}>
        <CardContainer
          className="cards"
          checked={checked}
          cards={state.dealerCards}
          loading={state.loading}
        />
      </div>
      <div className={classes.dealerCard}>
        <Avatar
          className={classes.avatar}
          alt="dealer"
          src="https://image.shutterstock.com/image-vector/casino-player-icon-600w-518699749.jpg"
        />
        <Typography variant="h6" gutterBottom className={classes.score}>
          Player 1 Score: {state.player1Total}
        </Typography>
      </div>
      <div className={classes.dealerCardsContainer}>
        <CardContainer
          className="player"
          checked={checked}
          cards={state.player1Cards}
          loading={state.loading}
        />
      </div>
      <div>
        <Button
          disabled={!state.player1Turn}
          size="medium"
          variant="contained"
          className={classes.dealerButton}
          onClick={() => {
            getNewCard('player'); setChecked(true)
          }}
        >
          Player 1 prend une carte
        </Button>
        {
          state.player1Turn && 
          <Button
            disabled={!state.player1Turn}
            size="medium"
            variant="contained"
            className={classes.dealerButton}
            onClick={() => {
              dispatch({
                type: 'UPDATE_PLAYER1_TURN',
                payload: false
              });
            }}
          >
            Je passe
          </Button>
        }
      </div>
    </div>
  );
}

export default App;
