import React from "react";
import useDataApi from "./customHook";
import initialState from "./store/initialState";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import CardContainer from "./components/CardContainer";
import ParticipantPanel from "./components/ParticipantContainer/index";
import CustomButton from "./components/common/CustomButton";
import Alert from "./components/common/Alert";

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
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    overflowX: "auto"
  }
}));

function App() {
  const [state, dispatch, getNewCard, getNewDeck] = useDataApi(initialState);

  const [checked, setChecked] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div className={classes.app}>
      <ParticipantPanel
        alt="dealer"
        src="https://c8.alamy.com/comp/K035CA/live-dealer-single-flat-icon-on-white-background-vector-illustration-K035CA.jpg"
        participantPanelTitle={`Score Dealer: ${state.dealerTotal}`}
        turn={!state.player1Turn}
      />
      <div>
        {!state.player1Turn && (
          <CustomButton
            disabled={state.dealerTotal > 17}
            onClick={() => {
              dispatch({
                type: "UPDATE_PLAYER1_TURN",
                payload: false
              });
              getNewCard("dealer");
              setChecked(true);
            }}
            buttonTitle={"Dealer prend une carte"}
          />
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
      <ParticipantPanel
        alt="dealer"
        src="https://image.shutterstock.com/image-vector/casino-player-icon-600w-518699749.jpg"
        participantPanelTitle={`Score Joueur 1: ${state.player1Total}`}
        turn={state.player1Turn}
      />
      <div className={classes.dealerCardsContainer}>
        <CardContainer
          className="player"
          checked={checked}
          cards={state.player1Cards}
          loading={state.loading}
        />
      </div>
      <div>
        <CustomButton
          disabled={!state.player1Turn || state.player1Total > 21}
          onClick={() => {
            getNewCard("player");
            setChecked(true);
          }}
          buttonTitle={"Joueur 1 prend une carte"}
        />
        {state.player1Turn && (
          <CustomButton
            onClick={() => {
              dispatch({
                type: "UPDATE_PLAYER1_TURN",
                payload: false
              });
            }}
            buttonTitle={"Je passe"}
          />
        )}
      </div>
      <Alert
        open={state.dealerTotal >= 17 || state.player1Total >= 21}
        win={
          (state.player1Total <= 21 &&
            state.player1Total > state.dealerTotal) ||
          state.dealerTotal > 21
        }
        state={state}
        replay={() => {
          getNewDeck();
          dispatch({
            type: "REINIT_ALL",
            payload: initialState
          });
          handleClose();
        }}
      />
    </div>
  );
}

export default App;
