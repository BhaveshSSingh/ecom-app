import React from "react";

const UPDATE_SELECTED_CATEGORY = "UPDATE_SELECTED_CATEGORY";
// Type of the action
const ADD_PRODUCTS = "ADD_PRODUCTS";
const ADD_CATEGORIES = "ADD_CATEGORIES";

const ACTION = {
  UPDATE_SELECTED_CATEGORY,
  ADD_PRODUCTS,
  ADD_CATEGORIES,
};

const initalState = {
  products: [],
  categories: [],
};

// When the action happens
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.UPDATE_SELECTED_CATEGORY: {
      return { ...state, selectedCategory: payload };
    }
    case ACTION.ADD_PRODUCTS: {
      return { ...state, products: payload };
    }
    case ACTION.ADD_CATEGORIES: {
      return { ...state, categories: payload };
    }
  }
  return state;
}

const StateContext = React.createContext();
const StateProvider = ({ children }) => {
  const reducerContext = React.useReducer(reducer, initalState);
  // 1. state variable => initialState
  // 2. dispatch function => dispatch actions
  return (
    <StateContext.Provider value={reducerContext}>
      {children}
    </StateContext.Provider>
  );
};

// Custom Hooks
const useSelector = (fn) => fn(React.useContext(StateContext)[0]);

const useDispatch = () => React.useContext(StateContext)[1];

export { StateProvider, useSelector, useDispatch, ACTION };
