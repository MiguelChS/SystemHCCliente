let init = {
    NombreApellido:"",
    NumDocumento:"",
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
        case "INSERT_TABLA_PERSON_FILTRO":{
            return{...state,tabla:action.value,tablaAux:action.value}
        }
        case "INSERT_ERR_PERSON_FILTRO":{
            return{...state,mjsErr:action.value}
        }
        case "EXECUTE_FILTER_PERSON_FILTRO":{
            return{...state,tabla:state.tablaAux.filter((obj)=>{
                let exitNombre = state.NombreApellido ? new RegExp(`${state.NombreApellido.toUpperCase()}.*`).test(`${obj.nombre} ${obj.apellido}`.toUpperCase()): true;
                let exitDocument = state.NumDocumento ? new RegExp(`${state.NumDocumento.toUpperCase()}.*`).test(`${obj.tipoDocu} ${obj.numeroDocumento}`.toUpperCase()) : true;
                return (exitNombre && exitDocument)
            })}
        }

        case "UPDATE_ITEM_TABLE_PERSON_FILTER":{
            let form = action.value;
            return{...state,tabla:state.tabla.map((obj)=>{
                if(obj._id == form.id){
                    obj.nombre = form.name;
                    obj.apellido = form.lastName;
                    obj.telefono = form.telefono;
                    obj.mail = form.mail;
                    obj.numeroDocumento = form.numDocumento;
                    obj.tipoDocu = form.idTipoDocumento.label;
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