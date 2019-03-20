import React from 'react';
import { TacoTable, DataType, SortDirection, Formatters,
  Summarizers, TdClassNames } from 'react-taco-table';

import {BuyIn_columns} from './BuyIn_Format';
import {Data} from './BuyIn_Data';

export {BuyIn_Table};

class BuyIn_Table extends React.Component {
  render() {
    return (
      <TacoTable
        className="simple-example"
        columns={BuyIn_columns}
        columnHighlighting
        data={Data}
        striped
        sortable
      />
    );
  }
}