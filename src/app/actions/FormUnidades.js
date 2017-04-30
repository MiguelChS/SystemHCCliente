/**
 * Created by mc185249 on 4/24/2017.
 */
/**
 * Created by mc185249 on 4/23/2017.
 */
import request from '../Request/Request'
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

export function changeStateSendForm(valor) {
    return {
        type:"CHANGE_STATE_SEND_UNITS",
        value:valor
    }
}
export function sendForm(form) {
    return function(dispatch) {
        request.post('http://localhost:3001/api/newUnidad',
            {
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
                    {type:"CLEAR_FORM_UNITS"},
                    {
                        type:"INSERT_ERR_MJS_UNITS",
                        value:""
                    },
                    changeStateSendForm(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    {
                        type:"INSERT_ERR_MJS_UNITS",
                        value:err.response ? err.response.data.err : "no hay conexion"
                    },
                    changeStateSendForm(false)
                ])
            });
    }
}