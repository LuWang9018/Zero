import {RequestData} from '../../RequestData/RequestData'

//Client Server
const Request_Data = 'Request_Data';

//Class Panel
const Change_Tmp_Class = 'Change_Tmp_Class';
const handleInputChange = 'handleInputChange';
const handleSelectChange = 'handleSelectChange';
const AddClass = 'AddClass';
const ChangeClass = 'ChangeClass';
const Btn_Cancle = 'Btn_Cancle';
const Set_ActiveTab = 'Set_ActiveTab';
const Delete_Tab = 'Delete_Tab';
const Set_Date = 'Set_Date';
const ChangeColor = 'ChangeColor';

export function Act_RequestData(Data){
	return{
		type: Request_Data,
		Data
	}
}

