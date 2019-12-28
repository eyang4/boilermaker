import '../public/index.css'

import React from 'react'
// React is required for the JSX of the first argument of ReactDOM.render()
import ReactDOM from 'react-dom'
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <div>Hello from React</div>
  </Provider>,
  document.getElementById('app')
)
// note the store is encapsulated in an object
