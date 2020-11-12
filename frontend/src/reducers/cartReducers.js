import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      //single item sent as OBJECT
      const item = action.payload;

      //find if there is already an item in cart similar to the single item sent by user
      const itemExist = state.cartItems.find(
        (element) => element.product === item.product
      );

      /*if a similar item exist in the cart then replace it with the same item, but the newer one(like different quantity) */
      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((element) =>
            /*Loop through until that similar product is found and then replace it when the
          new user similar item even though it is the same(but different quantity), if it doesn't match then 
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
    case CART_REMOVE_ITEM:
      return {
        ...state,
        //set a new array without the one that equals the action payload's product id
        cartItems: state.cartItems.filter(
          (element) => element.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_RESET:
      return {
        ...state,
        cartItems: [],
        shippingAddress: {},
      };
    default:
      return state;
  }
};
