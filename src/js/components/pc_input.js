import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button} from 'antd';
import { Card } from 'antd';
import PCTable from './pc_table'

const Option = Select.Option;


export default class PCInput extends React.Component {
    constructor () {
        super();
        this.state = {
            sourceNumber : 0,
            dataSource :[]
        }
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {
        const n = this.state.sourceNumber;
        var temp = [];
        for(var i = 0;i < n; i++){
            var t = {}  ;
            t.name = '进程'+ (i + 1);
            t.key = i+1;    
            t.allocationA = Math.random() * 4 | 0;
            t.allocationB = Math.random() * 4 | 0;
            t.allocationC = Math.random() * 4 | 0;
            t.NeedA = Math.random() * 5 | 0;
            t.NeedB = Math.random() * 5 | 0;
            t.NeedC = Math.random() * 5 | 0;
            t.maxA = t.allocationA + t.NeedA;
            t.maxB = t.allocationB + t.NeedB;
            t.maxC = t.allocationC + t.NeedC;  
            temp.push(t)          
        }
        temp[0].availableA = Math.random()*5|0 + 4;
        temp[0].availableB = Math.random()*5|0 + 4;
        temp[0].availableC = Math.random()*5|0 + 4;
        this.setState({dataSource:temp});
        this.props.changeNumber(this.state.sourceNumber);
        this.props.changeData(temp);
    }

    handleChangeSelect (e) { 
        this.setState({sourceNumber:e})   
    }

    render() {
        return (
         <div  className='panel'>
         <Row>
         <Col span={24}>
         <Card title="资源分配初始化"  hoverable={true}>
            <Row>
            <Col span={6}>             
                <div>
                    <label>进程数量</label>
                    <Select defaultValue="0" style={{ width: 120,marginLeft: 10 }} onChange= {this.handleChangeSelect}>
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    </Select>
                </div>
            </Col>
            <Col span={2}>
            <Button type="primary" onClick={this.handleClick}>确定</Button>
            </Col>
            <Col span={2}>
            <Button type="dashed">重置</Button>
            </Col>
            </Row>
            <PCTable data={this.state.dataSource} ></PCTable>
         </Card>
         </Col>
         </Row>
          </div>
        )
    }
}