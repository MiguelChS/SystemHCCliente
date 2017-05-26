import request from '../Request/Request'

export function insertFecha(valor) {
    return {
        type:"INSERT_DATE_EGRESO",
        value:valor
    }
}
export function insertTipoCosto(valor) {
    return {
        type:"INSERT_TIPO_COSTO_EGRESO",
        value:valor
    }
}
export function insertTipoMoneda(valor) {
    return {
        type:"INSERT_TIPO_MONEDA_EGRESO",
        value:valor
    }
}
export function insertTipoPago(valor) {
    return {
        type:"INSERT_TIPO_PAGO_EGRESO",
        value:valor
    }
}
export function insertImporte(valor) {
    return {
        type:"INSERT_IMPORTE_EGRESO",
        value:valor
    }
}


export function insertAuto(valor) {
    return {
        type:"INSERT_ADD_AUTO_EGRESO",
        value:valor
    }
}
export function removeAutoCom(valor) {
    return {
        type:"DELETE_AUTO_EGRESO",
        value:valor
    }
}
export function removeAllAutoCom() {
    return {
        type:"DELTE_ALL_AUTO_EGRESO",
    }
}
export function insertMjsErr(valor) {
    return {
        type:"INSERT_ERR_MJS_EGRESO",
        value:valor
    }
}
export function changeStateSendForm(valor) {
    return {
        type:"CHANGE_STATE_SEND_EGRESO",
        value:valor
    }
}
export function insertCambioDolar(valor) {
    return {
        type:"INSERT_CAMBIO_DOLAR_EGRESO",
        value:valor
    }
}
export function clearForm() {
    return {
        type:"CLEAR_FORM_EGRESO",
    }
}
export function sendForm(form,idUsuario) {
    let formFormat ={
        Fecha:form.Fecha,
        idTipoCosto:form.idTipoCosto.value,
        idTipoMoneda:form.idTipoMoneda.value,
        idTipoPago:form.idTipoPago.value,
        cambioDolar:form.cambioDolar,
        importe:form.importe,
        idUsuario:idUsuario
    };
    return function(dispatch) {
        request.post('http://localhost:3001/api/newCosto',formFormat)
            .then(()=>{
                dispatch([
                    clearForm(),
                    insertMjsErr(""),
                    changeStateSendForm(false)
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

