/**
 * Created by mc185249 on 4/24/2017.
 */
/**
 * Created by mc185249 on 4/23/2017.
 */
let init = {
    piso:null,
    unidad:null,
    idOrientacion:null,
    caracteristicas:null,
    superficieCubierta:null,
    balconTerraza:null,
    terrrazaExterna:null,
    sendForm:false,
    errMjs:""
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
        case "INSERT_ERR_MJS_UNITS":{
            return{...state,errMjs:action.value}
        }
        case "CHANGE_STATE_SEND_UNITS":{
            return{...state,sendForm:action.value}
        }
        default:{
            return{...state}
        }
    }
}

export default reducer;