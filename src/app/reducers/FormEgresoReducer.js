/**
 * Created by mc185249 on 4/30/2017.
 */
import moment from 'moment';
let init = {
    Fecha:moment().format("YYYY-MM-DD"),
    idTipoCosto:null,
    idTipoMoneda:null,
    idTipoPago:null,
    importe:null,
    cambioDolar:null,
    sendForm:false,
    errMjs:"",
    autoCategoria:[]
};

function buscarHijo(list,key) {
    for(let i = 0; i < list.length; i++){
        if(list[i].keyParent == key){
            return list[i].keyChildren;
        }
    }
    return null;
}

function buscarDesencia(key,list,resultListKeys) {
    let auxKey = buscarHijo(list,key);
    if(auxKey){
        resultListKeys.push(auxKey);
        return buscarDesencia(auxKey,list,resultListKeys)
    }else{
       return resultListKeys;
    }
}

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_DATE_EGRESO":{
            return{...state,Fecha:action.value}
        }
        case "INSERT_TIPO_COSTO_EGRESO":{
            return{...state,idTipoCosto:action.value}
        }
        case "INSERT_TIPO_MONEDA_EGRESO":{
            return{...state,idTipoMoneda:action.value}
        }
        case "INSERT_TIPO_PAGO_EGRESO":{
            return{...state,idTipoPago:action.value}
        }

        case "INSERT_ADD_AUTO_EGRESO":{
            let aux = state.autoCategoria.find(obj => obj.keyChildren == action.value.keyChildren);
            let nuevoAutoComplete = {};
            if(!aux){
                nuevoAutoComplete = action.value;
            }
            return {...state,autoCategoria:[...state.autoCategoria,nuevoAutoComplete]}
        }
        case "DELETE_AUTO_EGRESO":{
            //nos llega keyChildren
            let keyChildren = action.value;
            //bucamos el hijo que alla generado y sus nietos y sus tatare nietos ....+
            let keys = buscarDesencia(keyChildren,state.autoCategoria,[]);
            let auxArray = [...state.autoCategoria];
            //eliminamos el que coincida con el keys
            for(let i=0;i < keys.length ;i++){
                auxArray = auxArray.filter(obj=>obj.keyChildren != keys[i])
            }
            return {...state,autoCategoria:auxArray}
        }
        case "DELTE_ALL_AUTO_EGRESO":{
            return {...state,autoCategoria:[]}
        }
        case "INSERT_IMPORTE_EGRESO":{
            return{...state,importe:action.value}
        }
        case "INSERT_CAMBIO_DOLAR_EGRESO":{
            return{...state,cambioDolar:action.value}
        }
        case "CLEAR_FORM_EGRESO":{
            return{...state,...init}
        }
        case "INSERT_ERR_MJS_EGRESO":{
            return{...state,errMjs:action.value}
        }
        case "CHANGE_STATE_SEND_EGRESO":{
            return{...state,sendForm:action.value}
        }
        default:{
            return state;
        }
    }
}

export default reducer;