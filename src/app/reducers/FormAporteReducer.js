/**
 * Created by mc185249 on 4/24/2017.
 */
/**
 * Created by mc185249 on 4/23/2017.
 */
import moment from 'moment';
let init = {
    Fecha:moment().format("YYYY-MM-DD"),
    idSocio:null,
    idTipoMoneda:null,
    importe:null,
    idTipoAporte:null,
    cambioDolar:null,
    sendForm:false,
    errMjs:""
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_SOCIO_APORTE":{
            return{...state,idSocio:action.value}
        }
        case "INSERT_TYPE_MONEY_APORTE":{
            return{...state,idTipoMoneda:action.value}
        }
        case "INSERT_IMPORTE_APORTE":{
            return{...state,importe:action.value}
        }
        case "INSERT_CAMBIO_DOLAR_APORTE":{
            return{...state,cambioDolar:action.value}
        }
        case "INSERT_DATE_APORTE":{
            return{...state,Fecha:action.value}
        }
        case "INSERT_TYPE_APORTE_APORTE":{
            return{...state,idTipoAporte:action.value}
        }
        case "CLEAR_FORM_APORTE":{
            return{...state,...init}
        }
        case "INSERT_ERR_MJS_APORTE":{
            return{...state,errMjs:action.value}
        }
        case "CHANGE_STATE_SEND_APORTE":{
            return{...state,sendForm:action.value}
        }
        default:{
            return{...state}
        }
    }
}

export default reducer;