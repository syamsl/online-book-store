import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { CODReducer } from "./CODReducer";
import { searchReducer } from "./searchReducer";
import { deliveryAddReducer } from "./deliveryAddReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
  search: searchReducer,
  deliverAddress: deliveryAddReducer,
});

export default rootReducer;
