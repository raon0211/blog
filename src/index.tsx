import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

if (typeof document !== 'undefined') {
  const render = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  render(<App />, document.getElementById('root'));
}

export default App;
