/**
 * Created by mc185249 on 5/25/2017.
 */
let init = {
    chart:null,
    data:{},
    dataCruda:{},
    Moneda:1,
    periodoR:''
};
function reducer(state=init,action) {
    switch (action.type){
        case "LOAD_DATA_CASH_FLOW":{
            return {...state,data:action.value,periodoR:action.value.periodoReintegro}
        }
        case "LOAD_DATA_CRUDA_CASH_FLOW":{
            return {...state,dataCruda:action.value}
        }
        case "LOAD_CHAR_CASH_FLOW":{
            return {...state,chart:action.value}
        }
        case "INSERT_MONEY_CASH_FLOW":{
            return {...state,Moneda:action.value}
        }
        default:{
            return state;
        }
    }
}

export default reducer;