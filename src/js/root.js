import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Button} from 'antd';
import PCIndex from './components/pc_index';
import 'antd/dist/antd.css';
import '../css/pc.css';
import MediaQuery from 'react-responsive';

export default class Root extends React.Component {
	render() {
		return (
      <div>
        <PCIndex/>
			</div>
		);
	};
}
ReactDOM.render(
	<Root/>, document.getElementById('root'));