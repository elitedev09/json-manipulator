import { INCREMENT, DECREMENT } from "./counter.types";

const INITIAL_STATE = {
  count: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        naturalData: action.payload,
      };

    case DECREMENT:
      return {
        ...state,
        count: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
