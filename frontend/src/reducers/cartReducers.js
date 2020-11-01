import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      //single item sent as OBJECT
      const item = action.payload;

      //find if there is already an item in cart similar to the single item sent by user
      const itemExist = state.cartItems.find(
        (element) => element.product === item.product
      );

      /*if a similar item exist in the cart then replace it with the same item, but the newer one */
      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((element) =>
            /*Loop through until that similar product is found and then replace it when the
          new user similar item even though it is the same, if it doesn't match then 
          return back its original element 'element' */
            element.product === itemExist.product ? item : element
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
};
