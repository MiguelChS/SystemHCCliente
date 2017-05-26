import Request from '../Request/Request';
import { changeRequest } from './LayoutAction';
import { addModal } from './modalAction';
import { preCargaUnist } from './FormUnidades';

export function insertUnidad(valor) {
    return {
        type:"INSERT_UNIDAD_UNITS_FILTRO",
        value:valor
    }
}
export function insertPiso(valor) {
    return {
        type:"INSERT_PISO_UNITS_FILTRO",
        value:valor
    }
}
export function insertOrientacion(valor) {
    return {
        type:"INSERT_ORIENTACION_UNITS_FILTRO",
        value:valor
    }
}
export function insertVenta(valor) {
    return {
        type:"INSERT_VENTA_UNITS_FILTRO",
        value:valor
    }
}
export function insertTabla(valor) {
    return {
        type:"INSERT_TABLA_UNITS_FILTRO",
        value:valor
    }
}
export function insertERR(valor) {
    return {
        type:"INSERT_ERR_UNITS_FILTRO",
        value:valor
    }
}
export function insertSUCCESS(valor) {
    return {
        type:"INSERT_SUCCESS_UNITS_FILTRO",
        value:valor
    }
}

export function filtrar() {
    return {
        type:"EXECUTE_FILTER_UNITS_FILTRO"
    }
}

export function Editar(form,component,source){
    return [
        preCargaUnist({
            id:form._id,
            piso:form.piso,
            unidad:form.unidad,
            idOrientacion:source.find(obj=> obj.label == form.orientacion),
            caracteristicas:form.caracteristicas,
            superficieCubierta:form.superficieCubierta,
            balconTerraza:form.Balcon_terraza,
            terrrazaExterna:form.terraza_externa,
        }),
        addModal({
            body:component,
            data:null,
            size:"lg"
        })
    ]
}

export function Delete(id) {
    return[
        changeRequest(true),
        DeleteRegistro(id)
    ]
}

export function removeResult(valor) {
    return {
        type:"DELETE_ITEM_TABLE_UNITS_FILTER",
        value:valor
    }
}

export function ActulizarResult(form) {
    return {
        type:"UPDATE_ITEM_TABLE_UNITS_FILTER",
        value:form
    }
}

export function searchFormulario() {
    return [
        changeRequest(true),
        requestSearch()
    ]
}

function DeleteRegistro(id) {
    return (dispatch)=>{
        Request.post(`http://localhost:3001/api/DeleteUnit`,{id})
            .then((result)=>{
                dispatch([
                    removeResult(id),
                    changeRequest(false),
                    insertERR(""),
                ]);
            })
            .catch((err)=>{
                dispatch(
                    changeRequest(false),
                    insertERR(err.response ? err.response.data.err : "no hay conexion")
                )
            });
    }
}

function requestSearch() {
    return (dispatch)=>{
        Request.get(`http://localhost:3001/api/getAllUnidades`)
            .then((result)=>{
                dispatch([
                    insertTabla(result.data),
                    changeRequest(false),
                    insertERR(""),
                ]);
            })
            .catch((err)=>{
                dispatch(
                    changeRequest(false),
                    insertERR(err.response ? err.response.data.err : "no hay conexion")
                )
            });
    }
}