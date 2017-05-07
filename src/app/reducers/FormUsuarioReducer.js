/**
 * Created by mc185249 on 4/23/2017.
 */
let init = {
    name:null,
    lastName:null,
    telefono:null,
    numDocumento:null,
    idTipoDocumento:null,
    idTipoMoneda:null,
    importe:null,
    mail:null,
    sendForm:false,
    errMjs:""
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_NAME_FORM_USER":{
            return{...state,name:action.value}
        }
        case "INSERT_LAST_NAME_FORM_USER":{
            return{...state,lastName:action.value}
        }
        case "INSERT_PHONE_FORM_USER":{
            return{...state,telefono:action.value}
        }
        case "INSERT_TYPE_DOCUMENT_FORM_USER":{
            return{...state,idTipoDocumento:action.value}
        }
        case "INSERT_NUMBER_DOCUMENT_FORM_USER":{
            return{...state,numDocumento:action.value}
        }
        case "INSERT_MAIL_FORM_USER":{
            return{...state,mail:action.value}
        }
        case "INSERT_TYPE_MONEY_USER":{
            return{...state,idTipoMoneda:action.value}
        }
        case "INSERT_IMPORTE_USER":{
            return{...state,importe:action.value}
        }
        case "CLEAR_FORM_USER":{
            return{...state,...init}
        }
        case "INSERT_ERR_MJS_USER":{
            return{...state,errMjs:action.value}
        }
        case "CHANGE_STATE_SEND_USER":{
            return{...state,sendForm:action.value}
        }
        default:{
            return{...state}
        }
    }
}

export default reducer;