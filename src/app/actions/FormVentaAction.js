import request from '../Request/Request'
import {loadSourceUnits , removeSourceUnits} from './sourceAction';
import {LoadDataOwnerLabel} from './FormPropietarioAction';
import {loadAuto} from './autoCompleteAction';

export function insertUnits(valor) {
    return {
        type:"INSERT_UNITS_SALES",
        value:valor
    }
}
export function insertOwner(valor) {
    return {
        type:"INSERT_OWNER_SALES",
        value:valor
    }
}
export function insertStateSale(valor) {
    return {
        type:"INSERT_STATE_SALES",
        value:valor
    }
}
export function insertDate(valor) {
    return {
        type:"INSERT_DATE_SALES",
        value:valor
    }
}
export function insertConditionPayment(valor) {
    return {
        type:"INSERT_CONDITION_PAYMENT_SALES",
        value:valor
    }
}
export function insertCountPayment(valor) {
    return {
        type:"INSERT_COUNT_PAYMENT_SALES",
        value:valor
    }
}
export function insertTypeMoney(valor) {
    return {
        type:"INSERT_TYPE_MONEY_SALES",
        value:valor
    }
}
export function insertCost(valor) {
    return {
        type:"INSERT_COST_SALES",
        value:valor
    }
}
export function insertTypePayment(valor) {
    return {
        type:"INSERT_TYPE_PAYMENT_SALES",
        value:valor
    }
}
export function changeStateSendForm(valor) {
    return {
        type:"CHANGE_STATE_SEND_SALES",
        value:valor
    }
}
export function insertMjsErr(valor) {
    return {
        type:"INSERT_ERR_MJS_SALES",
        value:valor
    }
}
export function clearForm() {
    return{
        type:"CLEAR_FORM_SALES"
    }
}
export function sendForm(form,idUsuario,idForm) {
    return function(dispatch) {
        request.post('http://localhost:3001/api/newSale',
            {
                idUnidad:form.idUnidad.value,
                idPropietario:form.idPropietario,
                idEstadoVenta:form.idEstadoVenta.value,
                Fecha:form.Fecha,
                idCondicionPago:form.idCondicionPago.value,
                cantidadPago:form.cantidadPago,
                idTipoMoneda:form.idTipoMoneda.value,
                importe:form.importe,
                TipoPago:form.TipoPago.value,
                idUsuario:idUsuario
            })
            .then((result)=>{
                dispatch([
                    clearForm(),
                    removeSourceUnits(form.idUnidad.value),
                    insertMjsErr(""),
                    changeStateSendForm(false),
                    LoadDataOwnerLabel(null),
                    loadAuto({id:idForm,state:{}})
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
export function searchUnits() {
    return function(dispatch) {
        request.get('http://localhost:3001/api/searchUnits')
            .then((result)=>{
                let Owner = result.data.Units.length > 0 ? result.data.Units : null;
                dispatch([
                    insertMjsErr(Owner ? "":"No hay unidades cargadas"),
                    loadSourceUnits(result.data.Units)
                ])
            })
            .catch((err)=>{
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    changeStateSendForm(false)
                ])
            });
    }
}