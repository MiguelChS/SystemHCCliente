/**
 * Created by mc185249 on 4/23/2017.
 */
import request from '../Request/Request'
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
export function changeStateSendForm(valor) {
    return {
        type:"CHANGE_STATE_SEND_USER",
        value:valor
    }
}
export function sendUsuario(form) {
    return function(dispatch) {
        request.post('http://localhost:3001/api/NewSocio',
            {
                name:form.name,
                lastName:form.lastName,
                phone:form.telefono,
                numberDocument:form.numDocumento,
                typeDocument:form.idTipoDocumento.value,
                mail:form.mail
            })
            .then((result)=>{
                dispatch([
                    {type:"CLEAR_FORM_USER"},
                    {
                        type:"INSERT_ERR_MJS_USER",
                        value:""
                    },
                    changeStateSendForm(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    {
                        type:"INSERT_ERR_MJS_USER",
                        value:err.response ? err.response.data.err : "no hay conexion"
                    },
                    changeStateSendForm(false)
                ])
            });
    }
}