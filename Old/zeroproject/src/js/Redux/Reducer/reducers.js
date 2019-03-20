import React, {Component} from 'react';
import {store} from '../../Redux/Redux';


//Table
import {Act_SetCurrentTable} from '../Action/Table/Table'

//functions
import {SubmitData, Act_OpenAddWindow, Act_CloseAddWindow} from '../Action/Table/Table'


export function Reducer(state, action){
	switch (action.type){
		case 'Request_Data':
			console.log('Reducer : Request_Data     (Reducer.JS)');
			console.log(action.Data);

		    return Object.assign({}, state, Red_Request_Data(state, action.Data));
		    break;	
		case 'SetCurrentTable':
			console.log('Reducer : Act_SetCurrentTable     (Reducer.JS)');
			console.log(action.Data);
		    return { 
							...state,
							Config:{
									...state.Config,
									Table:{
										...state.Config.Table,
										CurrentTable: action.Data
									}
						  			
						  		}
						}
		    break;	
		case 'OpenAddWindow':
			console.log('Reducer : Act_OpenAddWindow     (Reducer.JS)');
		    return { 
				...state,
				Config:{
						...state.Config,
						Table:{
							...state.Config.Table,
							AddPanel: true,
						}
			  			
			  		}
			}
			break; 
		case 'CloseAddWindow':
			console.log('Reducer : Act_CloseAddWindow    (Reducer.JS)');
		    return { 
				...state,
				Config:{
						...state.Config,
						Table:{
							...state.Config.Table,
							AddPanel: false,
						}
			  			
			  		}
			}
			break; 
		case 'SubmitData':
		    return { 
				...state,
			}
		    break;	   
		default:
			return state;      
		}
};

