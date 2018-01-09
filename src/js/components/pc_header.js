import React from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class PCHeader extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<header>
				<h2 className="white">操作系统课程设计——银行家算法</h2>
				<h4 className="white">by 陈佩涵</h4>					
			</header>
		);
	};
}
