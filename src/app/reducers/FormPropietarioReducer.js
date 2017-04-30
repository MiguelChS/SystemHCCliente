/**
 * Created by mc185249 on 4/23/2017.
 */
let init = {
    name:null,
    lastName:null,
    telefono:null,
    numDocumento:null,
    idTipoDocumento:null,
    mail:null,
    numberDocumentSerach:"",
    errMjsSearch:"",
    btnNumberDocument:false,
    sendForm:false,
    errMjs:"",
    mjsSuccess:""
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_NAME_FORM_OWNER":{
            return{...state,name:action.value}
        }
        case "INSERT_LAST_NAME_FORM_OWNER":{
            return{...state,lastName:action.value}
        }
        case "INSERT_PHONE_FORM_OWNER":{
            return{...state,telefono:action.value}
        }
        case "INSERT_TYPE_DOCUMENT_FORM_OWNER":{
            return{...state,idTipoDocumento:action.value}
        }
        case "INSERT_NUMBER_DOCUMENT_FORM_OWNER":{
            return{...state,numDocumento:action.value}
        }
        case "INSERT_NUMBER_DOCUMENT_SEARCH_FORM_OWNER":{
            return{...state,numberDocumentSerach:action.value}
        }
        case "INSERT_MAIL_FORM_OWNER":{
            return{...state,mail:action.value}
        }
        case "CLEAR_FORM_OWNER":{
            return{...state,...init}
        }
        case "INSERT_ERR_MJS_OWNER":{
            return{...state,errMjs:action.value}
        }
        case "INSERT_ERR_MJS_SEARCH_OWNER":{
            return{...state,errMjsSearch:action.value}
        }
        case "INSERT_SUCCESS_MJS_OWNER":{
            return{...state,mjsSuccess:action.value}
        }
        case "CHANGE_STATE_SEND_OWNER":{
            return{...state,sendForm:action.value}
        }
        case "CHANGE_STATE_SEARCH_OWNER":{
            return{...state,btnNumberDocument:action.value}
        }
        default:{
            return{...state}
        }
    }
}

export default reducer;