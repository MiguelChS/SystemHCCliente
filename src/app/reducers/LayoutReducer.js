let init={
    showMenuLeft:true,
    DataUser:null,
    bodyContent:null,
    cambioDefault:15,
    request:false,
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
        case "LOAD_CAMBIO_DEFAULT_LAYOUT":{
            return {...state,cambioDefault:action.value}
        }
        case "LOAD_CHANGE_REQUEST_LAYOUT":{
            return {...state,request:action.value}
        }
        default:{
            return state;
        }
    }
}
export default reducer;