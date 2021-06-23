import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import authenticatedUserReducer from "./reducers/authenticatedUserReducer";
import vaccinationReducer from "./reducers/vaccinationReducer";

//Reducers used in defining store
const reducers = combineReducers({
  authenticatedUser: authenticatedUserReducer,
  vaccinations: vaccinationReducer,
});

//Create store using reducers and Thunk
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
