/**
 * Created by mc185249 on 5/7/2017.
 */
let init={
    chart:null,
    data:{},
    tabla:[],
    dataCruda:{},
    totalCajaDolar:0,
    totalCajaPesos:0,
    Moneda:1
};
function reducer(state=init,action) {
    switch (action.type){
        case "LOAD_DATA_CAJA":{
            return {...state,data:action.value}
        }
        case "LOAD_DATA_CRUDA_CAJA":{
            return {...state,dataCruda:action.value}
        }
        case "LOAD_CHAR_CAJA":{
            return {...state,chart:action.value}
        }
        case "INSERT_MONEY_CAJA":{
            return {...state,Moneda:action.value}
        }
        case "LOAD_TABLA_CAJA":{
            let data = action.value.tabla;
            return {...state,tabla:data.tabla,totalCajaDolar:data.totalDolar,totalCajaPesos:data.totalPesos}
        }
        default:{
            return state;
        }
    }
}
export default reducer;