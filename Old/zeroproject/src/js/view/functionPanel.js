import React, { Component } from 'react';

//redux
import { createStore } from 'redux';
import {store} from '../Redux/Redux';


export class BuildAddTable extends Component{
	constructor(props){
		super(props);
	}

	onInputChange(event) {
        // for a regular input field, read field name and value from the event
        console.log('handleChange1: ');	
		console.log(event.target.name);	
        this.props.onChange(event.target.name, event.target.value);
    }

	render(){
		var RJSelement = [];
		var tableFormat = this.props.BuyIn_columns;
		if(tableFormat != undefined){
			for(var i = 0; i < tableFormat.length; i++){
				if(tableFormat[i].columns != undefined){
					var tmp_key = tableFormat[i].Header + i;
					var tmp_RJSelement = [<BuildAddTable key = {tmp_key}
											BuyIn_columns = {tableFormat[i].columns}
											onChange = {this.props.onChange}
											
										/>];
					RJSelement = [...RJSelement, ...tmp_RJSelement];
				}else if(tableFormat[i].haveAdd){
					var theKey = tableFormat[i].Header;
					var theClassName = 'AddTableOuterBox';
					var theID = tableFormat[i].Header + 'OuterBox';
					//console.log('theKey: ' + theKey);
					RJSelement.push(
						<div key = {theKey} className = {theClassName} id = {theID}>
							<div className = 'AddTableHeader'>
								{theKey}
								<input 
									name = {tableFormat[i].accessor}
									onChange = {this.onInputChange.bind(this)}
								/>
							</div>
						</div>
					)
				}
			}
		}
		return RJSelement;
	}
}