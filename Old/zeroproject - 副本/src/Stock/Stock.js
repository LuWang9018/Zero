import React from 'react';
import { TacoTable, DataType, SortDirection, Formatters,
  Summarizers, TdClassNames } from 'react-taco-table';

import {Stock_columns} from './Stock_Format';
import {Data} from './Stock_Data';

export {Stock_Table};

class Stock_Table extends React.Component {
  render() {
    return (
      <TacoTable
        className="simple-example"
        columns={Stock_columns}
        columnHighlighting
        data={Data}
        striped
        sortable
      />
    );
  }
}