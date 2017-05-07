import request from '../Request/Request'
import {LoadDataOwnerLabel} from './FormPropietarioAction';

export function insertSocio(valor) {
    return {
        type:"INSERT_SOCIO_APORTE",
        value:valor
    }
}
export function insertTypeMoney(valor) {
    return {
        type:"INSERT_TYPE_MONEY_APORTE",
        value:valor
    }
}
export function insertImporte(valor) {
    return {
        type:"INSERT_IMPORTE_APORTE",
        value:valor
    }
}
export function insertDate(valor) {
    return {
        type:"INSERT_DATE_APORTE",
        value:valor
    }
}
export function insertTypeAporte(valor) {
    return {
        type:"INSERT_TYPE_APORTE_APORTE",
        value:valor
    }
}

export function changeStateSendForm(valor) {
    return {
        type:"CHANGE_STATE_SEND_APORTE",
        value:valor
    }
}

export function insertMjsErr(valor) {
    return {
        type:"INSERT_ERR_MJS_APORTE",
        value:valor
    }
}
export function clearForm() {
    return{
        type:"CLEAR_FORM_APORTE"
    }
}
export function insertCambio(valor) {
    return{
        type:"INSERT_CAMBIO_DOLAR_APORTE",
        value:valor
    }
}
export function sendForm(form,idUsuario) {
    return function(dispatch) {
        request.post('http://localhost:3001/api/newAporte',
            {
                Fecha:form.Fecha,
                idSocio:form.idSocio,
                idTipoMoneda:form.idTipoMoneda.value,
                importe:form.importe,
                idTipoAporte:form.idTipoAporte.value,
                id_usuario:idUsuario
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