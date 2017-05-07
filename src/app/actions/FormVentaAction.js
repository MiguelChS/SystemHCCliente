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
export function insertTypeMoneyCuota(valor) {
    return {
        type:"INSERT_TYPE_MONEY_SALES",
        value:valor
    }
}
export function insertCostCouta(valor) {
    return {
        type:"INSERT_COST_SALES",
        value:valor
    }
}
export function insertTypePaymentAde(valor) {
    return {
        type:"INSERT_TYPE_PAYMENT_ADELANTO_SALES",
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
export function clearForm(valor) {
    return[{
        type:"CLEAR_FORM_SALES",
        value:valor
        },
        loadAuto({id:"idUnidad",state:{}})
    ]
}
export function insertCostoAdelanto(valor) {
    return{
        type:"INSERT_COST_ADELANTO_SALES",
        value:valor
    }
}

export function insertTipoMonedaAdelanto(valor) {
    return{
        type:"INSERT_TYPE_MONEY_ADELANTO_SALES",
        value:valor
    }
}
export function insertTypeVenta(valor) {
    return{
        type:"INSERT_TYPE_VENTA_SALES",
        value:valor
    }
}
export function insertUnitsReserve(valor) {
    return[
        loadAuto({id:"idUnidad",state:{}}),
        {
        type:"INSERT_UNITS_RESERVE_SALES",
        value:valor
        },
        insertUnits(valor ? valor.unidad : null)]
}
export function sendForm(form,idUsuario,idForm) {
    return function(dispatch) {
        request.post('http://localhost:3001/api/newSale',
            {
                idUnidad:form.idUnidad.value,
                idPropietario:form.idPropietario,
                Fecha:form.Fecha,
                importeAdelanto:form.importeAdelanto,
                tipoMonedaAdelanto:form.tipoMonedaAdelanto.value,
                tipoPagoAdelanto:form.tipoPagoAdelanto.value,
                cantidadPago:form.cantidadPago,
                idTipoMonedaCuota: form.idTipoMonedaCuota ? form.idTipoMonedaCuota.value : null,
                importeCuota:form.importeCuota,
                TipoVenta:form.TipoVenta.value,
                Reserva:form.selectUnidadReserva.value,
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