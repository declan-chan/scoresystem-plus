import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';
import configureStore from './configureStore';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // render(App) will cause full Reload!
    // render(App)
    render()
  });
}

const store = configureStore();

const render = () => {
	ReactDOM.render(
		//production??
		<AppContainer>
			<Root store={store} />
		</AppContainer>,
		document.getElementById('root')
	)
}

render();