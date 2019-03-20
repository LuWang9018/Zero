import React, { Component } from 'react';

//redux
import {store} from '../Redux/Redux';


import ReactTable from "react-table";
import treeTableHOC from "react-table/lib/hoc/treeTable";

//table
import {BuyIn_columns, BuyIn_Functions} from './BuyIn_Format';
import {Data} from './BuyIn_Data';
import 'react-table/react-table.css'

//FunctionPanel
import {BuildAddTable} from '../view/FunctionPanel';

const TreeTable = treeTableHOC(ReactTable);

//Actions
import {Act_SubmitData, Act_CloseAddWindow} from '../Redux/Action/Table/Table';




export class BuyIn_Table extends Component {
	constructor(props){
		super(props)
		this.state = {
			BuyIn_Table_add:{

			}
		}
	}

	onChange(id, data) {
		var cur_state = Object.assign({}, this.state);
		var new_state = {
						...cur_state,
						BuyIn_Table_add:{
							...cur_state.tmp_add,
							[id]:data
						}
					}
		// console.log('handleChange: ');	
		// console.log(new_state);		
		// console.log('event.target.id: ');	
		// console.log(data);	
		this.setState(new_state);
	}	

	Submit(){
		//ToDo: add input check
		var cur_state = Object.assign({}, this.state);
		console.log('Submit');

		store.dispatch(Act_SubmitData(cur_state.BuyIn_Table_add));
		store.dispatch(Act_CloseAddWindow());
	}

	Cancle(){
		var cur_state = Object.assign({}, this.state);
		var new_state = {
						...cur_state,
						BuyIn_Table_add:{
						}
					}
		this.setState(new_state);
					
		store.dispatch(Act_CloseAddWindow());
	}

	CreateAddWindow(){
		if(store.getState().Config.Table.AddPanel){
			return (
				<div>
					<BuildAddTable
						BuyIn_columns = {BuyIn_columns}
						onChange = {this.onChange.bind(this)}
					/>
					<div>
						<button onClick = {this.Submit.bind(this)}>
							Save
						</button>
						<button onClick = {()=>this.Cancle()}>
							Cancle
						</button>
					</div>
				</div>
			)
		}
	}

	CreateFunctionPanel(){
		var functions = BuyIn_Functions;

		var RJSelement = [];
		if(functions != undefined){
			for(var i = 0; i < functions.length; i++){
				var theKey = 'FunctionPanel-' + functions[i].Name;
				RJSelement.push(
					<button key = {theKey} onClick = {functions[i].Function}>
						{functions[i].Name}
					</button>
				)
			}
		}
		return RJSelement;
	}


	render() {
		return (
			<div>
				<ReactTable        
					data={this.props.Data}
					columns={BuyIn_columns}
					pivotBy={['Order_Number', 'Product_Name']}
				/>
				<div>
					{this.CreateFunctionPanel()}
				</div>
				<div>
					{this.CreateAddWindow()}
				</div>
			</div>
		);
	}


}
