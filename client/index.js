import '../public/index.css'

import React from 'react'
// React is required for the JSX of the first argument of ReactDOM.render()
import ReactDOM from 'react-dom'
import store from './store'
import {Provider} from 'react-redux'

const handleSubmit = (evt) => {
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <form>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username'/>
        <label htmlFor='password'>Password</label>
        <input type='text' name='password'/>
        <button onSubmit={handleSubmit}>Submit</button>
      </form>
    </div>
  </Provider>,
  document.getElementById('app')
)
// note the store is encapsulated in an object
