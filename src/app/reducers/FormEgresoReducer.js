/**
 * Created by mc185249 on 4/30/2017.
 */
import moment from 'moment';
let init = {
    Fecha:moment().format("YYYY-MM-DD"),
    idTipoCosto:null,
    idTipoMoneda:null,
    idTipoPago:null,
    importe:null,
    sendForm:false,
    errMjs:"",
    autoCategoria:[]
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_DATE_EGRESO":{
            return{...state,Fecha:action.value}
        }
        case "INSERT_TIPO_COSTO_EGRESO":{
            return{...state,idTipoCosto:action.value}
        }
        case "INSERT_TIPO_MONEDA_EGRESO":{
            return{...state,idTipoMoneda:action.value}
        }
        case "INSERT_TIPO_PAGO_EGRESO":{
            return{...state,idTipoPago:action.value}
        }

        case "INSERT_ADD_AUTO_EGRESO":{
            return {...state,autoCategoria:[...state.autoCategoria,action.value]}
        }
        case "DELETE_AUTO_EGRESO":{
            return {...state,autoCategoria:state.autoCategoria.filter(obj=>obj.key != action.value)}
        }
        case "DELTE_ALL_AUTO_EGRESO":{
            return {...state,autoCategoria:[]}
        }
        case "INSERT_IMPORTE_EGRESO":{
            return{...state,importe:action.value}
        }
        case "CLEAR_FORM_EGRESO":{
            return{...state,...init}
        }
        case "INSERT_ERR_MJS_EGRESO":{
            return{...state,errMjs:action.value}
        }
        case "CHANGE_STATE_SEND_EGRESO":{
            return{...state,sendForm:action.value}
        }
        default:{
            return state;
        }
    }
}

export default reducer;