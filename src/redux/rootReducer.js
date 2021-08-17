import { combineReducers } from "redux";

import dataReducer from "./SaveData/data.reducer";

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;
