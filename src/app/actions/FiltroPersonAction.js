import Request from '../Request/Request';
import { changeRequest } from './LayoutAction';
import { addModal } from './modalAction';

export function insertNameLastName(valor) {
    return {
        type:"INSERT_NOMBRE_PERSON_FILTRO",
        value:valor
    }
}
export function insertNumberDocument(valor) {
    return {
        type:"INSERT_NUM_DOCUMENTO_PERSON_FILTRO",
        value:valor
    }
}
export function insertSocio(valor) {
    return {
        type:"INSERT_SOCIO_PERSON_FILTRO",
        value:valor
    }
}

export function insertTabla(valor) {
    return {
        type:"INSERT_TABLA_PERSON_FILTRO",
        value:valor
    }
}
export function insertERR(valor) {
    return {
        type:"INSERT_ERR_PERSON_FILTRO",
        value:valor
    }
}
export function insertSUCCESS(valor) {
    return {
        type:"INSERT_SUCCESS_PERSON_FILTRO",
        value:valor
    }
}

export function filtrar() {
    return {
        type:"EXECUTE_FILTER_PERSON_FILTRO"
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
        type:"DELETE_ITEM_TABLE_PERSON_FILTER",
        value:valor
    }
}

export function ActulizarResult(form) {
    return {
        type:"UPDATE_ITEM_TABLE_PERSON_FILTER",
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
        Request.get(`http://localhost:3001/api/getAllPerson`)
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