import React from 'react';
import { TacoTable, DataType, SortDirection, Formatters,
  Summarizers, TdClassNames } from 'react-taco-table';

export {Stock_columns}


const Stock_columns = [
  {
    id: 'Product_Name',
    type: DataType.String,
    header: 'Product Name',
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