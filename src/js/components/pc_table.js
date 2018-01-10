import React from 'react';
import { Table, Icon, Divider } from 'antd';
const { Column, ColumnGroup } = Table;
/*组件接口
data: 列表数据
*/


export default class PCTable extends React.Component {
    constructor (props) {
        super (props);
    }


    render () {
        return (
            <Table dataSource={this.props.data} bordered pagination={false} >

            <Column title="进程名" dataIndex="name" key="name" />

            <ColumnGroup title="Max">
              <Column title="A" dataIndex="maxA"  key="maxA"/>
              <Column title="B" dataIndex="maxB" key="maxB" />
              <Column title="C" dataIndex="maxC" key="maxC" />
            </ColumnGroup>

            <ColumnGroup title="Allocation">
              <Column title="A" dataIndex="allocationA"  key="allocationA"/>
              <Column title="B" dataIndex="allocationB" key="allocationB" />
              <Column title="C" dataIndex="allocationC" key="allocationC" />
            </ColumnGroup>

            <ColumnGroup title="Need">
              <Column title="A" dataIndex="NeedA"  key="NeedA"/>
              <Column title="B" dataIndex="NeedB" key="NeedB" />
              <Column title="C" dataIndex="NeedC" key="NeedC" />
            </ColumnGroup>

            <ColumnGroup title="Available">
              <Column title="A" dataIndex="availableA"  key="availableA"/>
              <Column title="B" dataIndex="availableB" key="availableB" />
              <Column title="C" dataIndex="availableC" key="availableC" />
            </ColumnGroup>
              
          </Table>
        )
    }
}
