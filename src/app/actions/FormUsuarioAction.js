/**
 * Created by mc185249 on 4/23/2017.
 */
import request from '../Request/Request'
import {changeRequest} from './LayoutAction';
import {ActulizarResult} from './FiltroPersonAction';
export function insertName(valor) {
    return {
        type:"INSERT_NAME_FORM_USER",
        value:valor
    }
}
export function insertLastName(valor) {
    return {
        type:"INSERT_LAST_NAME_FORM_USER",
        value:valor
    }
}
export function insertPhone(valor) {
    return {
        type:"INSERT_PHONE_FORM_USER",
        value:valor
    }
}
export function insertTypeDocument(valor) {
    return {
        type:"INSERT_TYPE_DOCUMENT_FORM_USER",
        value:valor
    }
}
export function insertNumberDocument(valor) {
    return {
        type:"INSERT_NUMBER_DOCUMENT_FORM_USER",
        value:valor
    }
}
export function insertMail(valor) {
    return {
        type:"INSERT_MAIL_FORM_USER",
        value:valor
    }
}

export function insertSUCCESS(valor) {
    return {
        type:"INSERT_SUCCESS_MJS_USER",
        value:valor
    }
}

export function insertERR(valor) {
    return {
        type:"INSERT_ERR_MJS_USER",
        value:valor
    }
}

export function clearForm() {
    return {
        type:"CLEAR_FORM_USER"
    }
}
export function preCargaPerson(valor) {
    return {
        type:"PRE_CARGAR_FORM_USER",
        value:valor
    }
}

export function sendUsuario(form,idUsuario) {
    return [
        changeRequest(true),
        enviarUsuario(form,idUsuario)
    ]
}

function enviarUsuario(form,idUsuario) {
    return function(dispatch) {
        request.post('http://localhost:3001/api/NewSocio',
            {
                id:form.id,
                name:form.name,
                lastName:form.lastName,
                phone:form.telefono,
                numberDocument:form.numDocumento,
                typeDocument:form.idTipoDocumento.value,
                mail:form.mail,
                idUsuario:idUsuario
            })
            .then((result)=>{
                dispatch([
                    (form.id ? null : clearForm()),
                    insertERR(""),
                    insertSUCCESS("Se cargo correctamente"),
                    changeRequest(false),
                    (form.id ? ActulizarResult(form) : null)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertERR(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequest(false)
                ])
            });
    }
}