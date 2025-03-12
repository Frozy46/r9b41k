// customerReducer.js
const initialState = {
    customers: [],
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_CUSTOMER":
        return {
          ...state,
          customers: state.customers.map((c) =>
            c.id === action.payload.id ? action.payload : c
          ),
        };
      default:
        return state;
    }
  };
  
  export default customerReducer;