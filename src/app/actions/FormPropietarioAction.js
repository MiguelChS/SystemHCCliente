/**
 * Created by mc185249 on 4/24/2017.
 */
/**
 * Created by mc185249 on 4/23/2017.
 */
import request from '../Request/Request'
import {insertUnitsReserve} from './FormVentaAction';
import {insertVenta} from './FormPagoAction';

export function insertName(valor) {
    return {
        type:"INSERT_NAME_FORM_OWNER",
        value:valor
    }
}
export function insertLastName(valor) {
    return {
        type:"INSERT_LAST_NAME_FORM_OWNER",
        value:valor
    }
}
export function insertPhone(valor) {
    return {
        type:"INSERT_PHONE_FORM_OWNER",
        value:valor
    }
}
export function insertTypeDocument(valor) {
    return {
        type:"INSERT_TYPE_DOCUMENT_FORM_OWNER",
        value:valor
    }
}
export function insertNumberDocument(valor) {
    return {
        type:"INSERT_NUMBER_DOCUMENT_FORM_OWNER",
        value:valor
    }
}
export function insertNumberDocumentSearch(valor) {
    return {
        type:"INSERT_NUMBER_DOCUMENT_SEARCH_FORM_OWNER",
        value:valor
    }
}
export function insertMail(valor) {
    return {
        type:"INSERT_MAIL_FORM_OWNER",
        value:valor
    }
}
export function changeStateSendForm(valor) {
    return {
        type:"CHANGE_STATE_SEND_OWNER",
        value:valor
    }
}
export function changeStateSendSearch(valor) {
    return {
        type:"CHANGE_STATE_SEARCH_OWNER",
        value:valor
    }
}
export function insertMjsErr(valor) {
    return {
        type:"INSERT_ERR_MJS_OWNER",
        value:valor
    }
}
export function insertMjsErrSearch(valor) {
    return {
        type:"INSERT_ERR_MJS_SEARCH_OWNER",
        value:valor
    }
}
export function insertMjsSuccess(valor) {
    return {
        type:"INSERT_SUCCESS_MJS_OWNER",
        value:valor
    }
}
export function clearForm() {
    return{
        type:"CLEAR_FORM_OWNER"
    }
}

export function LoadDataOwnerLabel(valor) {
    return{
        type:"LOAD_DATA_OWNER_LABEL",
        value:valor
    }
}

export function searchOwner(numberDocument,insertResutl,socio) {
    return function(dispatch) {
        request.post('http://localhost:3001/api/searchOwner',{numberDocument:numberDocument,socio:socio})
            .then((result)=>{
                let Owner = result.data.result.length > 0 ? result.data.result[0] : null;
                dispatch([
                    insertResutl(Owner ? Owner.id : Owner),
                    LoadDataOwnerLabel(Owner),
                    insertUnitsReserve(null),
                    insertVenta(null),
                    changeStateSendSearch(false),
                    insertMjsErrSearch(Owner ? "": "no se encontro coincidencia")
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertMjsErrSearch(err.response ? err.response.data.err : "no hay conexion"),
                    insertResutl(null),
                    insertUnitsReserve(null),
                    insertVenta(null),
                    LoadDataOwnerLabel(null),
                    changeStateSendSearch(false)
                ])
            });
    }
}

export function sendForm(form,insertResutl) {
    let formFormat ={
        name:form.name,
        lastName:form.lastName,
        phone:form.telefono,
        numberDocument:form.numDocumento,
        typeDocument:form.idTipoDocumento.value,
        mail:form.mail
    };
    return function(dispatch) {
        request.post('http://localhost:3001/api/newOwner',formFormat)
            .then((result)=>{
                formFormat.typeDocument = form.idTipoDocumento.label;
                dispatch([
                    clearForm(),
                    insertMjsErr(""),
                    insertMjsSuccess("Se cargo correctamente"),
                    insertResutl(result.data.id),
                    LoadDataOwnerLabel(formFormat),
                    changeStateSendForm(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    insertMjsSuccess(""),
                    changeStateSendForm(false)
                ])
            });
    }
}