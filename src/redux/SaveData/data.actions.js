import { NATURAL, MERGED } from "./data.types";

export const saveNaturalData = (payload) => {
  return {
    type: NATURAL,
    payload,
  };
};

export const saveMergedArray = (payload) => {
  return {
    type: MERGED,
    payload,
  };
};
