/**
 * Created by mc185249 on 4/24/2017.
 */
/**
 * Created by mc185249 on 4/23/2017.
 */
let init = {
    id:null,
    piso:null,
    unidad:null,
    idOrientacion:null,
    caracteristicas:null,
    superficieCubierta:null,
    balconTerraza:null,
    terrrazaExterna:null,
    errMjs:"",
    MjsSuccess:""

};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_PISO_UNITS":{
            return{...state,piso:action.value}
        }
        case "INSERT_UNIT_UNITS":{
            return{...state,unidad:action.value}
        }
        case "INSERT_ORIENTATION_UNITS":{
            return{...state,idOrientacion:action.value}
        }
        case "INSERT_FEATURE_UNITS":{
            return{...state,caracteristicas:action.value}
        }
        case "INSERT_SUPERFICIE_CUBIERTA_UNITS":{
            return{...state,superficieCubierta:action.value}
        }
        case "INSERT_BALCON_TERRAZA_UNITS":{
            return{...state,balconTerraza:action.value}
        }
        case "INSERT_TERRAZA_EXTERNA_UNITS":{
            return{...state,terrrazaExterna:action.value}
        }
        case "CLEAR_FORM_UNITS":{
            return{...state,...init}
        }
        case "PRE_CARGAR_UNITS":{
            return{...state,...action.value}
        }
        case "INSERT_ERR_MJS_UNITS":{
            return{...state,errMjs:action.value}
        }
        case "INSERT_SUCCESS_MJS_UNITS":{
            return{...state,MjsSuccess:action.value}
        }
        default:{
            return{...state}
        }
    }
}

export default reducer;