/**
 * Created by mc185249 on 5/7/2017.
 */
let init={
    chart:null,
    data:[],
    tabla:[]
};
function reducer(state=init,action) {
    switch (action.type){
        case "LOAD_DATA_CAJA":{
            return {...state,data:action.value}
        }
        case "LOAD_CHAR_CAJA":{
            return {...state,chart:action.value}
        }
        case "LOAD_TABLA_CAJA":{
            return {...state,tabla:action.value}
        }
        default:{
            return state;
        }
    }
}
export default reducer;