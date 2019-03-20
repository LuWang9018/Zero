import React, { Component } from 'react'; ;
import ReactTable from "react-table";

import {Stock_columns} from './Stock_Format';
import {Data} from './Stock_Data';
import 'react-table/react-table.css'


export class Stock_Table extends React.Component {
  render() {
    return (
      <ReactTable
        data={this.props.Data}
        columns={Stock_columns}       
      />
    );
  }
}