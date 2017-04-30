let init={
    showMenuLeft:true,
    DataUser:null,
    bodyContent:null
};

function reducer(state=init,action) {
    switch (action.type){
        case "CHANGE_MENU_LEFT_LAYOUT":{
            return {...state,showMenuLeft:!state.showMenuLeft}
        }
        case "LOAD_DATA_USER_LAYOUT":{
            return {...state,DataUser:{...action.value}}
        }
        case "LOAD_BODY_CONTENT_LAYOUT":{
            return {...state,bodyContent:action.value}
        }
        default:{
            return state;
        }
    }
}
export default reducer;