/**
 * Created by mc185249 on 5/6/2017.
 */
import moment from 'moment';
let init = {
    Fecha:moment().format("YYYY-MM-DD"),
    idTipoMoneda:null,
    idFormaPago:null,
    idTipoPago:null,
    importe:null,
    idVenta:null,
    sendForm:false,
    errMjs:"",
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_DATE_PAGO":{
            return{...state,Fecha:action.value}
        }
        case "INSERT_TYPE_MONEY_PAGO":{
            return{...state,idTipoMoneda:action.value}
        }
        case "INSERT_FORMA__PAGO":{
            return{...state,idFormaPago:action.value}
        }
        case "INSERT_TYPE_PAGO_PAGO":{
            return{...state,idTipoPago:action.value}
        }
        case "INSERT_IMPORTE_PAGO":{
            return{...state,importe:action.value}
        }
        case "INSERT_VENTA_PAGO":{
            return{...state,idVenta:action.value}
        }
        case "CLEAR_FORM_PAGO":{
            return{...state,...init}
        }
        case "INSERT_ERR_MJS_PAGO":{
            return{...state,errMjs:action.value}
        }
        case "CHANGE_STATE_SEND_PAGO":{
            return{...state,sendForm:action.value}
        }
        default:{
            return state;
        }
    }
}

export default reducer;