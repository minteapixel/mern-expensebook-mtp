import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { store } from './store/configureStore';

// const jsx = (
// 	<Provider store={store}>
// 		<AppRouter />
// 	</Provider>
// );


// let hasRendered = false;
// const renderApp = () => {
// 	if(!hasRendered) {
// 		ReactDOM.render(jsx, document.getElementById('root'));
// 		hasRendered = true;
// 	}
// };

// ReactDOM.render(<LoadingPage />, document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);