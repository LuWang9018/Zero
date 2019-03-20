import React, { Component } from 'react';

//redux
import { createStore } from 'redux';
import {store} from './Redux/Redux';

//tables
import {Stock_Table} from './Stock/Stock';
import {BuyIn_Table} from './BuyIn/BuyIn';

//Actions
import {Act_SetCurrentTable} from './Redux/Action/Table/Table';

//Data
import {Data} from './Stock/Stock_Data';

//DataIO
import {GetData} from './Data/DataIO';

class App extends Component {
  constructor(props) {
    super(props);
  }

  CreateTable(){
    var CurTable = store.getState().Config.Table.CurrentTable;
    console.log('CurTable: ' + store.getState().Config.Table.CurrentTable);

    if(CurTable === 'BuyIn'){
      return(
        React.createElement("div",
              {
                  className: "DataTable"
              },
              <BuyIn_Table Data={GetData(CurTable)}/>
        )
      );
    }
    else if(CurTable === 'SellOut'){
      return(
        React.createElement("div",
              {
                  className: "DataTable"
              },
              //<BuyIn_Table  Data={GetData(CurTable)/>
        )
      );
    }
    else if(CurTable === 'Stock'){
      return(
        React.createElement("div",
              {
                  className: "DataTable"
              },
              <Stock_Table Data={GetData(CurTable)}/>
        )
      );
    }
  }


  componentDidMount() {
      // it remembers to subscribe to the store so it doesn't miss updates
      this.unsubscribe = store.subscribe(this.UpdateCells.bind(this))
  }

  componentWillUnmount() {
  // and unsubscribe later
      this.unsubscribe()
  }

  UpdateCells(){
      this.forceUpdate();
  }

  handleTableChange(Table){
    console.log('handleTableChange');
    if(Table === 'BuyIn'){
      store.dispatch(Act_SetCurrentTable('BuyIn'));
    }
    else if(Table === 'SellOut'){
      store.dispatch(Act_SetCurrentTable('SellOut'));
    }
    else{
      store.dispatch(Act_SetCurrentTable('Stock'));
    }    
  }

  render() {
    return (
      <div>
        <div className='btn-group'>
          <button type="button" className="btn btn-primary" onClick={()=>this.handleTableChange('BuyIn')}>进货</button>
          <button type="button" className="btn btn-primary" onClick={()=>this.handleTableChange('SellOut')}>出货</button>
          <button type="button" className="btn btn-primary" onClick={()=>this.handleTableChange('Stock')}>库存</button>          
        </div>
        {this.CreateTable()}
      </div>
      );
  }
}

export default App;
