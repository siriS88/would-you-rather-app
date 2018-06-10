import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import middleware from './middleware';
import reducers from './reducers';
import SaveState from './utils/SaveState';

// This works to keep redux store state persistent, but since this app doesn't use a backend database,
// the changes made in the backend are lost on referesh as _DATA.js module data resets, so there will
// be backend errors when operating on any of the new data (that doesn't exist in _DATA.js but exists in redux store)

// const saveStateObj = new SaveState();
// const store=createStore(reducers, saveStateObj.loadState(), middleware);
//
// store.subscribe(()=>{
//     console.log(store.getState());
//     saveStateObj.saveState(store.getState());
// });

const store=createStore(reducers, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));