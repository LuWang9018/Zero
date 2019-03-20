import React from 'react';

//Button
import {RemoveElement} from '../Data/DataIO';

//redux
import {store} from '../Redux/Redux';
import {Act_OpenAddWindow, Act_handleInputChange} from '../Redux/Action/Table/Table';


export const BuyIn_columns = [
  {
    Header: '订单',
    columns:[
      {
        Header: '订单号',
        accessor: 'Order_Number',
        width: 120,

        haveAdd: true
      },
      {
        Header: '发货日期',
        accessor: 'Send_Date',
        width: 120,

        haveAdd: true
      },
      {
        Header: '到货日期',
        accessor: 'Arrive_Date',
        width: 120,

        haveAdd: true
      },
    ]
  },
  {
    Header: '产品信息',
    width: 100,
    columns:[
      {
        Header: '产品号',
        accessor: 'Product_Name',
        width: 100,

        haveAdd: true
      },
      {
        Header: '订购数量',
        accessor: 'Pruduct_Quantity',
        width: 100,

        haveAdd: true
      },
      {
        Header: '总价',
        accessor: 'Price_Total',
        width: 100,

        haveAdd: true
      },      
    ],
  },
  
  {
    Header: '',
    accessor: 'Order_Number',
    Cell: row => (
      <div>
        <button type="button" className="123" onClick = {()=>RemoveElement('BuyIn', row.value)}>Delete</button>
      </div>
    )
  },
];

export const BuyIn_Functions = [
  {
    Name: 'ADD',
    Function: ()=>{OpenAddWindow('ADD')},
  },
];

export function OpenAddWindow(props){
  store.dispatch(Act_OpenAddWindow(props));
}

function handleInputChange(event){
  store.dispatch(Act_handleInputChange(event));
}