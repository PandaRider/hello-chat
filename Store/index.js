import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../Reducers';

const store = createStore(
  reducers,
  {},                       //default state object. See Lecture 118
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
