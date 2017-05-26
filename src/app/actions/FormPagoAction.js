/**
 * Created by mc185249 on 5/6/2017.
 */
import Request from '../Request/Request';
import {LoadDataOwnerLabel} from './FormPropietarioAction';

export function insertDate(valor) {
    return {
        type:"INSERT_DATE_PAGO",
        value:valor
    }
}
export function insertMoney(valor) {
    return {
        type:"INSERT_TYPE_MONEY_PAGO",
        value:valor
    }
}
export function insertForma(valor) {
    return {
        type:"INSERT_FORMA__PAGO",
        value:valor
    }
}
export function insertPago(valor) {
    return {
        type:"INSERT_TYPE_PAGO_PAGO",
        value:valor
    }
}
export function insertImporte(valor) {
    return {
        type:"INSERT_IMPORTE_PAGO",
        value:valor
    }
}
export function insertVenta(valor) {
    return {
        type:"INSERT_VENTA_PAGO",
        value:valor
    }
}
export function clearForm(valor) {
    return {
        type:"CLEAR_FORM_PAGO",
        value:valor
    }
}
export function insertMjsErr(valor) {
    return {
        type:"INSERT_ERR_MJS_PAGO",
        value:valor
    }
}
export function changeStateSendForm(valor) {
    return {
        type:"CHANGE_STATE_SEND_PAGO",
        value:valor
    }
}
export function insertCambioDolar(valor) {
    return {
        type:"INSERT_CAMBIO_MONEDA_PAGO",
        value:valor
    }
}
export function sendForm(form,idUsuario) {
    return function(dispatch) {
        Request.post('http://localhost:3001/api/newPago',
            {
                Fecha:form.Fecha,
                idTipoMoneda:form.idTipoMoneda.value,
                idFormaPago:form.idFormaPago.value,
                importe:form.importe,
                idVenta:form.idVenta.value,
                idUsuario:idUsuario
            })
            .then((result)=>{
                dispatch([
                    clearForm(),
                    insertMjsErr(""),
                    changeStateSendForm(false),
                    LoadDataOwnerLabel(null)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    changeStateSendForm(false)
                ])
            });
    }
}