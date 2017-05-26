import moment from 'moment';
let init = {
    idProject:null,
    Fecha:moment().startOf("month").format("YYYY-MM-DD"),
    costoM2:"",
    plazoProjecto:"",
    tasaReferencia:"",
    cambioDolar:"",
    tabla:[],
    errMjs:"",
    mjsSuccess:""
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_DATE_INICIO":{
            let newTabla = [];
            let newFecha = moment(action.value).startOf("month").format("YYYY-MM-DD");
            if(state.plazoProjecto){
                let plazo  = parseInt(state.plazoProjecto,10) * 12;
                for (let i = 0; i < plazo ; i++){
                    let fecha = moment(newFecha).add(i,'months').format("YYYY-MM");
                    let exist = state.tabla.find( aux => aux.fechaLabel == fecha);
                    newTabla.push({
                        fechaLabel:fecha,
                        costo:exist ? exist.costo :"",
                        ingreso:exist ? exist.ingreso :"",
                        fecha:moment(newFecha).add(i,'months').format("YYYY-MM-DD")
                    })
                }
            }else{
                newTabla = [...state.tabla]
            }
            return{...state,Fecha:newFecha,tabla:newTabla}
        }
        case "INSERT_COSTO_M2_INICIO":{
            return{...state,costoM2:action.value}
        }
        case "INSERT_PLAZO_INICIO":{
            let newTabla = [];
            if(action.value){
                let plazo  = parseInt(action.value,10) * 12;
                for (let i = 0; i < plazo ; i++){
                    let fecha = moment(state.Fecha).add(i,'months').format("YYYY-MM");
                    let exist = state.tabla.find( aux => aux.fechaLabel == fecha);
                    newTabla.push({
                        fechaLabel:fecha,
                        costo:exist ? exist.costo :"",
                        ingreso:exist ? exist.ingreso :"",
                        fecha:moment(state.Fecha).add(i,'months').format("YYYY-MM-DD")
                    })
                }
            }else{
                newTabla = [...state.tabla]
            }

            return{...state,plazoProjecto:action.value,tabla:newTabla}
        }
        case "INSERT_TAZA_REFERENCIA_INICIO":{
            return{...state,tasaReferencia:action.value}
        }
        case "INSERT_CAMBIO_DOLAR_INICIO":{
            return{...state,cambioDolar:action.value}
        }
        case "INSERT_COSTO_TABLE_INICIO":{
            return{...state,tabla:state.tabla.map((obj)=>{
                if(obj.fechaLabel == action.value.fecha){
                    obj.costo = action.value.costo
                }
                return obj;
            })}
        }
        case "INSERT_INGRESO_TABLE_INICIO":{
            return{...state,tabla:state.tabla.map((obj)=>{
                if(obj.fechaLabel == action.value.fecha){
                    obj.ingreso = action.value.ingreso
                }
                return obj;
            })}
        }

        case "CLEAR_FORM_INICIO":{
            return{...state,...init}
        }
        case "INSERT_ERR_MJS_INICIO":{
            return{...state,errMjs:action.value}
        }
        case "INSERT_SUCCESS_MJS_INICIO":{
            return{...state,mjsSuccess:action.value}
        }
        case "CHANGE_STATE_SEND_INICIO":{
            return{...state,sendForm:action.value}
        }
        case "CHANGE_PRECARGA_INICIO":{
            return{...state,...action.value}
        }
        default:{
            return state
        }
    }
}

export default reducer;