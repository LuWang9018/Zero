import { createStore } from 'redux';
import { Reducer } from './Reducer/reducers';

var moment = require('moment');

var Data = {
    Config: {
        Table: {            
            CurrentTable: 'BuyIn' 
        },
        TimeTable: {
            AddClassWindowOn: false,
            AddTableDirty: false,
            ActiveTab: 0,
            CurrentAction: "null",
            ColorGroup: [
                            {
                                "borderColor": "#CCFFFF",
                                "fontColor": "#FFCCCC",
                                "backgroundColor" : "#FFCCCC",
                            },
                            {
                                "borderColor": "#FF9999",
                                "fontColor": "#000000",
                                "backgroundColor" : "#FFCCCC",
                            },
                            {
                                "borderColor": "#66CCCC",
                                "fontColor": "#000000",
                                "backgroundColor" : "#CCFFFF",
                            },
                            {
                                "borderColor": "#66CC66",
                                "fontColor": "#000000",
                                "backgroundColor" : "#CCFF99",
                            },                            
                        ]
        }
    }
};


export const store = createStore(Reducer, Data);