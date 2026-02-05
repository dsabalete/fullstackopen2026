import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App.jsx'
import anecdoteReducer from './reducers/anecdoteReducer.js'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
