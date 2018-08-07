import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './services';

export default createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)