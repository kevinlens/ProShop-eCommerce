import axios from 'axios';
import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  REMOVE_SUCCESS_ALERT,
  USER_DETAILS_RESET,
} from '../constants/userConstants';
import { ORDER_MY_LIST_RESET } from '../constants/orderConstants';
//

//

//

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    //
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //

    //destructure the 'res.data' which we got back
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));

    //
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      //if error.response exist THEN if data.message exist then send the data.message else the error.message
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//

//

//

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_MY_LIST_RESET });
};

//

//

//

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    //
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //

    //destructure the 'res.data' which we got back
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    //important to give the global state a logged in status as well
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));

    //
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      //if error.response exist THEN if data.message exist then send the data.message else the error.message
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.replace('User validation failed:', '')
          : error.message.replace('User validation failed:', ''),
    });
  }
};

//

//

//

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    //

    const {
      userLogin: { userInfo },
    } = getState();

    //
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //

    //destructure the 'res.data' which we got back
    const { data } = await axios.get(`/api/users/profile`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    //
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      //if error.response exist THEN if data.message exist then send the data.message else the error.message
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//

//

//

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    if (user) {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });
      //

      const {
        userLogin: { userInfo },
      } = getState();

      //
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      //

      //destructure the 'res.data' which we got back
      const { data } = await axios.put(`/api/users/profile`, user, config);
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      //==========These are extras for quick fixes
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });

      //Update user profile name
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } else {
      dispatch({
        type: REMOVE_SUCCESS_ALERT,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      //if error.response exist THEN if data.message exist then send the data.message else the error.message
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
