import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './component/module/rootReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

// redux devTool
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// reducer 와 devTool 을 가진 store 생성
const store = createStore(rootReducer, devTools);
root.render(
  
    <Provider store={store}>
      <App/>
    </Provider>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
