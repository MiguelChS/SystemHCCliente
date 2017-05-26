/**
 * Created by mc185249 on 5/26/2017.
 */
let init = {
    unidad:"",
    orientacion:"",
    piso:"",
    estadoVenta:"",
    tabla:[],
    tablaAux:[],
    mjsErr:"",
    mjsSuccess:""
};

function reducer(state = init,action) {
    switch (action.type){
        case "INSERT_UNIDAD_UNITS_FILTRO":{
            return{...state,unidad:action.value}
        }
        case "INSERT_PISO_UNITS_FILTRO":{
            return{...state,piso:action.value}
        }
        case "INSERT_ORIENTACION_UNITS_FILTRO":{
            return{...state,orientacion:action.value}
        }
        case "INSERT_VENTA_UNITS_FILTRO":{
            return{...state,estadoVenta:action.value}
        }
        case "INSERT_TABLA_UNITS_FILTRO":{
            return{...state,tabla:action.value,tablaAux:action.value}
        }
        case "INSERT_ERR_UNITS_FILTRO":{
            return{...state,mjsErr:action.value}
        }
        case "EXECUTE_FILTER_UNITS_FILTRO":{
            return{...state,tabla:state.tablaAux.filter((obj)=>{
                let exitUnida = state.unidad ? state.unidad == obj.unidad : true;
                let exitPiso = state.piso ? state.piso == obj.piso : true;
                let exitOrient = state.orientacion ? state.orientacion.label == obj.orientacion : true;
                let exitEstado = state.estadoVenta ? state.estadoVenta.label == obj.estado : true;
                return (exitUnida && exitPiso && exitOrient && exitEstado)
            })}
        }
        case "UPDATE_ITEM_TABLE_UNITS_FILTER":{
            let form = action.value;
            return{...state,tabla:state.tabla.map((obj)=>{
                if(obj._id == form.id){
                    obj._id = form.id;
                    obj.piso = form.piso;
                    obj.unidad = form.unidad;
                    obj.caracteristicas = form.caracteristicas;
                    obj.superficieCubierta = form.superficieCubierta;
                    obj.Balcon_terraza = form.balconTerraza;
                    obj.terraza_externa = form.terrrazaExterna;
                    obj.orientacion = form.idOrientacion.label;
                }
                return obj;
            })}
        }
        case "DELETE_ITEM_TABLE_UNITS_FILTER":{
            let id = action.value;
            return{...state,tabla:state.tabla.filter( obj=> obj._id != id)}
        }
        case "INSERT_SUCCESS_UNITS_FILTRO":{
            return{...state,mjsSuccess:action.value}
        }
        default:{
            return state;
        }
    }
}

export default reducer;