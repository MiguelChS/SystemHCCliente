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
    Fecha:moment().format("YYYY-MM-DD"),
    //adelanto
    importeAdelanto:null,
    tipoMonedaAdelanto:null,
    tipoPagoAdelanto:null,
    cambioDolar:null,
    //cuatoas
    cantidadPago:null,
    idTipoMonedaCuota:null,
    importeCuota:null,
    //estado de ventas
    sendForm:false,
    errMjs:"",
    TipoVenta:null,
    selectUnidadReserva:null
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_UNITS_SALES":{
            return{...state,idUnidad:action.value}
        }
        case "INSERT_TYPE_VENTA_SALES":{
            return{...state,TipoVenta:action.value}
        }
        case "INSERT_UNITS_RESERVE_SALES":{
            return{...state,selectUnidadReserva:action.value}
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
        case "INSERT_CAMBIO_DOLAR_SALES":{
            return{...state,cambioDolar:action.value}
        }
        case "INSERT_COUNT_PAYMENT_SALES":{
            return{...state,cantidadPago:action.value}
        }
        case "INSERT_TYPE_MONEY_SALES":{
            return{...state,idTipoMonedaCuota:action.value}
        }
        case "INSERT_TYPE_MONEY_ADELANTO_SALES":{
            return{...state,tipoMonedaAdelanto:action.value}
        }
        case "INSERT_COST_SALES":{
            return{...state,importeCuota:action.value}
        }
        case "INSERT_COST_ADELANTO_SALES":{
            return{...state,importeAdelanto:action.value}
        }
        case "INSERT_TYPE_PAYMENT_ADELANTO_SALES":{
            return{...state,tipoPagoAdelanto:action.value}
        }
        case "CLEAR_FORM_SALES":{
            if(action.value){
                return{...state,...init,...{idPropietario:state.idPropietario}}
            }else{
                return{...state,...init}
            }
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