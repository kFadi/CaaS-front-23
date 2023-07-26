import { combineReducers, createStore } from "redux";
import { companiesReducer } from "./CompaniesAppState";
import { couponsReducer } from "./CouponsAppState";
import { customersReducer } from "./CustomersAppState";
import { purchasedCouponsReducer } from "./PurchasedCouponsAppState";
import { userReducer } from "./UserAppState";

const reducers = combineReducers({
  userReducer: userReducer,
  couponsReducer: couponsReducer,
  purchasedCouponsReducer: purchasedCouponsReducer,
  companiesReducer: companiesReducer,
  customersReducer: customersReducer
});
const store = createStore(reducers);

export default store;
