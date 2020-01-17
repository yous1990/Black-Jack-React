export default (state, action) => {
    switch (action.type) {
        case 'NEW_DEALER_CARD':
        return {
            ...state,
            dealerCards: [
            ...state.dealerCards,
            action.payload
            ]
        }
        case 'NEW_PLAYER1_CARD':
        return {
            ...state,
            player1Cards: [
            ...state.player1Cards,
            action.payload
            ]
        }
        case 'UPDATE_REMAINING_COUNT':
        return {
            ...state,
            remainingCardsCount: action.payload 
        }
        case 'UPDATE_DEALER_TOT':
        return {
            ...state,
            dealerTotal: state.dealerTotal + action.payload 
        }
        case 'UPDATE_PLAYER1_TOT':
        return {
            ...state,
            player1Total: state.player1Total + action.payload 
        }
        case 'UPDATE_DECK_ID':
        return {
            ...state,
            deckId: action.payload 
        }
        case 'UPDATE_PLAYER1_TURN':
        return {
            ...state,
            player1Turn: action.payload 
        }
        case 'UPDATE_LOADING':
        return {
            ...state,
            loading: action.payload 
        }
        case 'REINIT_ALL':
        return action.payload
        default:
        throw new Error();
    }
}
  