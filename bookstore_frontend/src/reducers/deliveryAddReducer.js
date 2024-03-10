export function deliveryAddReducer(state = {}, action) {
    switch (action.type) {
      case "DELIVERY_ADD":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }
  
  //type payload
  