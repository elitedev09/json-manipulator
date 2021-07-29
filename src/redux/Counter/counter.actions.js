import { INCREMENT, DECREMENT } from "./counter.types";
const data = {};
export const increaseCounter = (payload) => {
  return {
    type: INCREMENT,
    payload,
  };
};

export const decreaseCounter = (payload) => {
  return {
    type: DECREMENT,
    payload,
  };
};
