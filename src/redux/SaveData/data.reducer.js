import { NATURAL, MERGED } from "./data.types";

const INITIAL_STATE = {
  data: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NATURAL:
      return {
        ...state,
        naturalData: action.payload,
      };

    case MERGED:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
