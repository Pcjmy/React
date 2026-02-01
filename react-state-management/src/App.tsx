import React from 'react';
// import Counter from './components/counter';
// import CustomStateManagement from './components/custom-state-management'
import Counter from './components/redux-counter';
import store from './components/redux-counter/store';
import { Provider } from 'react-redux';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
}

export default App;
