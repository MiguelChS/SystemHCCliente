/**
 * Created by mc185249 on 4/24/2017.
 */
/**
 * Created by mc185249 on 4/23/2017.
 */
import moment from 'moment';
let init = {
    idUnidad:null,
    idPropietario:null,
    idEstadoVenta:null,
    Fecha:moment().format("YYYY-MM-DD"),
    idCondicionPago:null,
    cantidadPago:null,
    idTipoMoneda:null,
    importe:null,
    TipoPago:null,
    sendForm:false,
    errMjs:""
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_UNITS_SALES":{
            return{...state,idUnidad:action.value}
        }
        case "INSERT_OWNER_SALES":{
            return{...state,idPropietario:action.value}
        }
        case "INSERT_STATE_SALES":{
            return{...state,idEstadoVenta:action.value}
        }
        case "INSERT_DATE_SALES":{
            return{...state,Fecha:action.value}
        }
        case "INSERT_CONDITION_PAYMENT_SALES":{
            return{...state,idCondicionPago:action.value}
        }
        case "INSERT_COUNT_PAYMENT_SALES":{
            return{...state,cantidadPago:action.value}
        }
        case "INSERT_TYPE_MONEY_SALES":{
            return{...state,idTipoMoneda:action.value}
        }
        case "INSERT_COST_SALES":{
            return{...state,importe:action.value}
        }
        case "INSERT_TYPE_PAYMENT_SALES":{
            return{...state,TipoPago:action.value}
        }
        case "CLEAR_FORM_SALES":{
            return{...state,...init}
        }
        case "INSERT_ERR_MJS_SALES":{
            return{...state,errMjs:action.value}
        }
        case "CHANGE_STATE_SEND_SALES":{
            return{...state,sendForm:action.value}
        }
        default:{
            return{...state}
        }
    }
}

export default reducer;