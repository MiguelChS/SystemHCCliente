let init = {
    NombreApellido:"",
    NumDocumento:"",
    Socio:null,
    tabla:[],
    tablaAux:[],
    mjsErr:"",
    mjsSuccess:""
};

function reducer(state = init,action) {
    switch (action.type){
        case "INSERT_NOMBRE_PERSON_FILTRO":{
            return{...state,NombreApellido:action.value}
        }
        case "INSERT_NUM_DOCUMENTO_PERSON_FILTRO":{
            return{...state,NumDocumento:action.value}
        }
        case "INSERT_SOCIO_PERSON_FILTRO":{
            return{...state,Socio:action.value}
        }
        case "INSERT_TABLA_PERSON_FILTRO":{
            return{...state,tabla:action.value,tablaAux:action.value}
        }
        case "INSERT_ERR_PERSON_FILTRO":{
            return{...state,mjsErr:action.value}
        }
        case "EXECUTE_FILTER_PERSON_FILTRO":{
            return{...state,tabla:state.tablaAux.filter((obj)=>{
                let exitUnida = state.unidad ? state.unidad == obj.unidad : true;
                let exitPiso = state.piso ? state.piso == obj.piso : true;
                let exitOrient = state.orientacion ? state.orientacion.label == obj.orientacion : true;
                let exitEstado = state.estadoVenta ? state.estadoVenta.label == obj.estado : true;
                return (exitUnida && exitPiso && exitOrient && exitEstado)
            })}
        }

        case "UPDATE_ITEM_TABLE_PERSON_FILTER":{
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

        case "DELETE_ITEM_TABLE_PERSON_FILTER":{
            let id = action.value;
            return{...state,tabla:state.tabla.filter( obj=> obj._id != id)}
        }

        case "INSERT_SUCCESS_PERSON_FILTRO":{
            return{...state,mjsSuccess:action.value}
        }
        default:{
            return state;
        }
    }
}

export default reducer;