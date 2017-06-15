import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import App from './todolist/App';
import 'antd/dist/antd.min.css';  // or 'antd/dist/antd.less'



const Root = ({ store }) => {
	const routes = (
		<Router history={browserHistory}>
			<Route path='/(:filter)' component={App} />
		</Router>
	)
	return (
		<Provider store={store}>
			{routes}
		</Provider>);
}

export default Root