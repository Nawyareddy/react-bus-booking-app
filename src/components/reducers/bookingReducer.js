const bookingReducer = (state = [], action) => {
  switch (action.type) {
    case "BOOK_TICKETS":
      return [...state, action.payload];

    default:
      return state;
  }
};
export default bookingReducer;
