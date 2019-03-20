import React from 'react';
import ReactDOM from 'react-dom';

//Data
import {Stock_Data} from '../Stock/Stock_Data';
import {BuyIn_Data} from '../BuyIn/BuyIn_Data';


export function GetData(table){
	if(table === 'Stock'){
		return Stock_Data;
	}else if(table === 'BuyIn'){
		return BuyIn_Data;
	}
	else if(table === 'SellOut'){
		//return SellOut_Data;
	}
}

export function RemoveElement(Table, ID){
	console.log('RemoveElemen-> Table: ' + Table + ' Value: ' + ID);
}

export function AddElement(Table, Data){
	console.log('RemoveElemen-> Table: ' + Table + ' Value: ' + ID);
}