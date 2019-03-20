//Table
const SetCurrentTable = 'SetCurrentTable';




export function Act_SetCurrentTable(Data){
	return{
		type: SetCurrentTable,
		Data
	}
}

//functions
const OpenAddWindow = 'OpenAddWindow';

export function Act_OpenAddWindow(Data){
	return{
		type: OpenAddWindow,
		Data
	}
}


//add panel
const handleInputChange = 'handleInputChange';
const SubmitData = 'SubmitData';
const CloseAddWindow = 'CloseAddWindow';


export function Act_CloseAddWindow(Data){
	return{
		type: CloseAddWindow,
		Data
	}
}

export function Act_handleInputChange(Data){
	return{
		type: handleInputChange,
		Data
	}
}

export function Act_SubmitData(Data){
	return{
		type: SubmitData,
		Data
	}
}
