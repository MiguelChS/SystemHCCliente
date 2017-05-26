/**
 * Created by mc185249 on 4/24/2017.
 */
/**
 * Created by mc185249 on 4/23/2017.
 */
import request from '../Request/Request'
import {changeRequest} from './LayoutAction';
import { ActulizarResult } from './FiltroUnidadAction';

export function insertPiso(valor) {
    return {
        type:"INSERT_PISO_UNITS",
        value:valor
    }
}
export function insertUnit(valor) {
    return {
        type:"INSERT_UNIT_UNITS",
        value:valor
    }
}
export function insertOrientation(valor) {
    return {
        type:"INSERT_ORIENTATION_UNITS",
        value:valor
    }
}
export function insertFeature(valor) {
    return {
        type:"INSERT_FEATURE_UNITS",
        value:valor
    }
}
export function insertSuperficie(valor) {
    return {
        type:"INSERT_SUPERFICIE_CUBIERTA_UNITS",
        value:valor
    }
}
export function insertBalcon(valor) {
    return {
        type:"INSERT_BALCON_TERRAZA_UNITS",
        value:valor
    }
}
export function insertTerraza(valor) {
    return {
        type:"INSERT_TERRAZA_EXTERNA_UNITS",
        value:valor
    }
}

export function insertMjsSuccess(valor) {
    return {
        type:"INSERT_SUCCESS_MJS_UNITS",
        value:valor
    }
}

export function insertMjsErr(valor) {
    return {
        type:"INSERT_ERR_MJS_UNITS",
        value:valor
    }
}

export function clearForm() {
    return {
        type:"CLEAR_FORM_UNITS"
    }
}
export function preCargaUnist(valor) {
    return {
        type:"PRE_CARGAR_UNITS",
        value:valor
    }
}

export function enviandoFormulario(form) {
    return [
        changeRequest(true),
        sendForm(form)
    ]
}

function sendForm(form) {
    return function(dispatch) {
        request.post('http://localhost:3001/api/newUnidad',
            {
                id:form.id,
                piso:form.piso,
                unidad:form.unidad,
                idOrientacion:form.idOrientacion.value,
                caracteristicas:form.caracteristicas,
                superficieCubierta:form.superficieCubierta,
                balconTerraza:form.balconTerraza,
                terrrazaExterna:form.terrrazaExterna
            })
            .then((result)=>{
                dispatch([
                    (form.id ? null : clearForm()),
                    changeRequest(false),
                    insertMjsSuccess("Se cargo correctamente"),
                    (form.id ? ActulizarResult(form) : null),
                    insertMjsErr("")
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequest(false)
                ])
            });
    }
}
