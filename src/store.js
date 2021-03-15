import { createStore, applyMiddleware, compose } from "redux";
import createRootReducer from "./reducer/rootReducer";
import thunk from "redux-thunk";
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = preloadedState => createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  )
export default configureStore;

// Previous Store with no connectedRouter
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export default createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
