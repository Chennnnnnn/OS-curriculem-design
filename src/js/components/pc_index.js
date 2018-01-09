import React from 'react';
import PCHeader from './pc_header';
import PCInput from './pc_input';
import PCAllot from './pc_allot';


export default class PCIndex extends React.Component {
    constructor () {
        super();
        this.state = {
            sourceNumber : 0,
            dataSource :[],
            dataAllot:[],
            warning:{} 
        }
        this.changeNumber = this.handleChangeNumber.bind(this);
        this.changeDataSource = this.handleChangedataSource.bind(this);
        this.changeDataAllot = this.handleChangedataAllot.bind(this);
    }

    handleChangeNumber (value) {
        this.setState({sourceNumber : value})
    } 

    handleChangedataSource (value) {
        this.setState({dataSource : value})
    } 

    handleChangedataAllot (value) {
        this.setState({dataAllot : value})
    }

    render () {
        return (
            <div>
              <PCHeader />
              <PCInput changeNumber={this.changeNumber} changeData={this.changeDataSource}/> 
              <PCAllot changeAllot={this.changeDataAllot} number={this.state.sourceNumber} dataSource={this.state.dataSource}/>                    
            </div>
        );
    }
}


