import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import middleware from './middleware';
import reducers from './reducers';
import SaveState from './utils/SaveState';

// const saveStateObj = new SaveState();
const store=createStore(reducers, middleware);

// store.subscribe(()=>{
//     console.log(store.getState());
//     saveStateObj.saveState(store.getState());
// });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));