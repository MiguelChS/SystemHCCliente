/**
 * Created by mc185249 on 4/23/2017.
 */
let init = {
    id:null,
    name:null,
    lastName:null,
    telefono:null,
    numDocumento:null,
    idTipoDocumento:null,
    mail:null,
    errMjs:"",
    mjsSuccess:""
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
        case "CLEAR_FORM_USER":{
            return{...state,...init}
        }
        case "PRE_CARGAR_FORM_USER":{
            return{...state,...action.value}
        }
        case "INSERT_ERR_MJS_USER":{
            return{...state,errMjs:action.value}
        }
        case "INSERT_SUCCESS_MJS_USER":{
            return{...state,mjsSuccess:action.value}
        }
        default:{
            return{...state}
        }
    }
}

export default reducer;