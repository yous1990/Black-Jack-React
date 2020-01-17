import { useReducer, useEffect} from "react";
import reducer from "./store/reducer";

const calc = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  QUEEN: 10,
  JACK: 10,
  KING: 10,
  ACE: 11
};

export default initialState => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { deckId, player1Total } = state;

  const getNewDeck = async () => {
    try {
      const response = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
      );
      const data = await response.json();
      dispatch({
        type: "UPDATE_REMAINING_COUNT",
        payload: data.remaining
      });
      dispatch({
        type: "UPDATE_DECK_ID",
        payload: data.deck_id
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getNewDeck();
  }, []);

  const getNewCard = async who => {
    dispatch({
      type: "UPDATE_LOADING",
      payload: true
    });
    try {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data = await response.json();
      if (who === "dealer") {
        dispatch({
          type: "NEW_DEALER_CARD",
          payload: data.cards[0]
        });
        dispatch({
          type: "UPDATE_DEALER_TOT",
          payload: calc[data.cards[0].value]
        });
      } else {
        dispatch({
          type: "NEW_PLAYER1_CARD",
          payload: data.cards[0]
        });
        dispatch({
          type: "UPDATE_PLAYER1_TOT",
          payload:
            data.cards[0].value === "ACE"
              ? player1Total + 11 > 21
                ? 1
                : 11
              : calc[data.cards[0].value]
        });
      }
      dispatch({
        type: "UPDATE_REMAINING_COUNT",
        payload: data.remaining
      });
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: "UPDATE_LOADING",
      payload: false
    });
  };

  return [state, dispatch, getNewCard, getNewDeck];
};
