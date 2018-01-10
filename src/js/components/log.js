import React from 'react';
import {List} from 'antd';


export default class Log extends React.Component {
    constructor(props) {
        super(props);
    }
    render () { 
        const data = [
            'Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
          ];
        return (
            <List
            size="small"  
            className="bWhite"          	
            header={<div>操作日志</div>}
            bordered
            dataSource={this.props.data}   
            renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        )
    }
}

