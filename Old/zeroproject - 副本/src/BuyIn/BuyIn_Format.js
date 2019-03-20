import React from 'react';
import { TacoTable, DataType, SortDirection, Formatters,
  Summarizers, TdClassNames } from 'react-taco-table';

export {BuyIn_columns}


const BuyIn_columns = [
  {
    id: 'Order_Number',
    type: DataType.String,
    header: 'Order_Number',
  },
  {
    id: 'Product_Unit_Price',
    type: DataType.Number,
    header: 'Year',
  },
  {
    id: 'Pruduct_Quantity',
    type: DataType.NumberOrdinal,
    header: 'Quantity',
  },
];