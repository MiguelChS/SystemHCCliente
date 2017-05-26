import Request from '../Request/Request';
import {changeRequest} from './LayoutAction';
import moment from 'moment';

export function insertDate(valor) {
    return {
        type:"INSERT_DATE_INICIO",
        value:valor
    }
}
export function insertCostoM2(valor) {
    return {
        type:"INSERT_COSTO_M2_INICIO",
        value:valor
    }
}
export function insertPlazo(valor) {
    return {
        type:"INSERT_PLAZO_INICIO",
        value:valor
    }
}
export function insertTaza(valor) {
    return {
        type:"INSERT_TAZA_REFERENCIA_INICIO",
        value:valor
    }
}

export function ingresoCosto(valor) {
    return {
        type:"INSERT_COSTO_TABLE_INICIO",
        value:valor
    }
}

export function ingresoIngreso(valor) {
    return {
        type:"INSERT_INGRESO_TABLE_INICIO",
        value:valor
    }
}
export function insertCambioDolar(valor) {
    return {
        type:"INSERT_CAMBIO_DOLAR_INICIO",
        value:valor
    }
}
export function cleanForm(valor) {
    return {
        type:"CLEAR_FORM_INICIO",
        value:valor
    }
}
export function insertMjsErr(valor) {
    return {
        type:"INSERT_ERR_MJS_INICIO",
        value:valor
    }
}
export function insertMjsSuccess(valor) {
    return {
        type:"INSERT_SUCCESS_MJS_INICIO",
        value:valor
    }
}

export function preCargarData(valor) {
    return {
        type:"CHANGE_PRECARGA_INICIO",
        value:{
            Fecha:moment.utc(valor.fechaInicio).format("YYYY-MM-DD"),
            costoM2:valor.costoM2,
            plazoProjecto:valor.plazo,
            tasaReferencia:valor.tasaRef,
            cambioDolar:valor.cambioDolar,
            tabla:valor.DetalleControIngreso.map((obj)=>{
                return {
                    fecha:moment.utc(obj.fecha).format("YYYY-MM-DD"),
                    costo:obj.costo,
                    ingreso:obj.ingreso,
                    fechaLabel:moment.utc(obj.fecha).format("YYYY-MM"),
                }
            })
        }
    }
}

export function sendData(data) {
    return [
        changeRequest(true),
        enviandoFormulario(data)
    ]
}
export function searchData() {
    return [
        changeRequest(true),
        searchFormulario()
    ]
}

function enviandoFormulario(data) {
    return function (dispatch) {
        Request.post('http://localhost:3001/api/startProyecto',{
            id:data.idProject,
            fechaInicio:data.Fecha,
            plazo:data.plazoProjecto,
            costoM2:data.costoM2,
            cambioDolar:data.cambioDolar,
            tasaRef:data.tasaReferencia,
            DetalleControIngreso:data.tabla.map(obj => { return {
                fecha:obj.fecha,
                costo:obj.costo,
                ingreso:obj.ingreso
            }})
        })
            .then((result)=>{
                dispatch(
                    [
                        changeRequest(false),
                        insertMjsErr(""),
                        insertMjsSuccess("Se cargo correctamente")
                    ]
                )
            })
            .catch((err)=>{
                dispatch(
                    [
                        changeRequest(false),
                        insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                        insertMjsSuccess("")
                    ]
                )
            })
    }
}

function searchFormulario() {
    return function (dispatch) {
        Request.get('http://localhost:3001/api/searchInicioProject')
            .then((result)=>{
                dispatch(
                    [
                        changeRequest(false),
                        insertMjsErr(""),
                        preCargarData(result.data)
                    ]
                )
            })
            .catch((err)=>{
                dispatch(
                    [
                        changeRequest(false),
                        insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                        insertMjsSuccess("")
                    ]
                )
            })
    }
}