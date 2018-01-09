import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Card } from 'antd';
import PCTable from './pc_table';
import Log from './log';
import {BankerAlgorithm} from './lib/calculate';
import { message } from 'antd';


/*
number:进程数量
dataSource：初始化进程分配

*/
const Option = Select.Option;


export default class PCAllot extends React.Component {
    constructor (props) {
        super(props);
        this.state ={
            project:0,
            resourceAllot:' ',
            dataAllot: props.dataSource,            
            deletePro:0,
            log:[]
        }
        this.changeAllot = this.handleChangeAllot.bind(this);
        this.changeProject = this.handleChangeProject.bind(this);
        this.changeDelete = this.handleChangeDelete.bind(this);
        this.ClickSure  = this.handleChlickSure.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({dataAllot: nextProps.dataSource});
    }

    handleChangeProject (value) {
        this.setState({project: (value)})
    }

    handleChangeAllot (e) {
        this.setState({ resourceAllot: e.target.value})
    }

    handleChangeDelete(value){
        this.setState({deletePro:(value)});
    }

    handleChlickSure () {
        let pro = this.state.project;
        let rAllot = this.state.resourceAllot.split(',');
        let dSource = this.state.dataAllot;

        let result = BankerAlgorithm(pro, rAllot, dSource);
        if(result.result) {
            //进行资源分配(所需资源减，占用资源加)

            dSource[pro].NeedA -= +rAllot[0];dSource[pro].allocationA += +rAllot[0];
            dSource[pro].NeedB -= +rAllot[1];dSource[pro].allocationB += +rAllot[1];
            dSource[pro].NeedC -= +rAllot[2];dSource[pro].allocationC += +rAllot[2];
            dSource[0].availableA -= +rAllot[0];
            dSource[0].availableB -= +rAllot[1];
            dSource[0].availableC -= +rAllot[2];

            this.setState({resourceAllot: ''});
            this.setState({dataAllot: dSource});
            message.success(result.message,2);
            this.setState((prevState,props) => (
                prevState.log.push(`为【${dSource[pro].name}】分配资源成功`)
            ));
        } else {

            this.setState({resourceAllot: ''});
            message.error(result.message,2);
            this.setState((prevState,props) => (
                prevState.log.push(`为【${dSource[pro].name}】分配资源失败`)
            ));
        }
    }


    //删除进程
    handleDelete () {
        let pre = this.state.dataAllot;
        let temp = pre[this.state.deletePro];       
        let a = pre[0].availableA += temp.allocationA;
        let b = pre[0].availableB += temp.allocationB;
        let c = pre[0].availableC += temp.allocationC;
        pre.splice(this.state.deletePro,1);
        if(this.state.deletePro == 0){
            pre[0].availableA = a;
            pre[0].availableB = b;
            pre[0].availableC = c;
        }
        this.setState({dataAllot:pre});
        message.success('撤销成功',2);
        this.setState((prevState,props) => (
            prevState.log.push(`撤销【${temp.name}】成功`)
        ));
    }
   
    
    render() {
        const options = [];
        for(let i = 0; i < this.state.dataAllot.length;i++){
            options.push(<Option value={i} key={i}>{this.state.dataAllot[i].name}</Option>)
        }

        return (
         <div  className='panel'>
         <Row>
         <Col span={24}>
         <Card title="资源分配"  hoverable={true}>
            <Row>
            <Col span={6}>             
                <div>
                    <label>分配的进程</label>
                    <Select style={{ width: 120,marginLeft: 10 }} onChange={this.changeProject}>
                    {options}
                    </Select>
                </div>
            </Col>
            <Col span={10}>               
                <div>
                    <Col span={10}>
                    <label>分配资源(用,隔开)</label>
                    </Col>
                    <Col span={8}>
                    <Input  placeholder="A B C" onChange={this.changeAllot} value={this.state.resourceAllot}/>
                    </Col>
                </div>
            </Col>
            <Col span={2}>
            <Button type="primary" onClick={this.ClickSure}>资源分配</Button>
            </Col>
            </Row>
            <Row className="row">
            <Col span={8} >
            <label>要撤销的进程</label>
                <Select  style={{ width: 120,marginLeft: 10 }} onChange={this.changeDelete}>
                  {options}
                </Select>
            </Col>
            <Button type="primary" onClick={this.handleDelete}>撤销进程</Button>
            </Row>
            <PCTable data={this.state.dataAllot}></PCTable>
            <Log data={this.state.log}></Log>
         </Card>
         </Col>
        
         
         </Row>
         
          </div>
        )
    }
}