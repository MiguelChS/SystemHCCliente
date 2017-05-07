/**
 * Created by mc185249 on 4/25/2017.
 */
let init={
    name:"",
    lastName:"",
    phone:"",
    numberDocument:"",
    typeDocument:"",
    mail:"",
    unidades:[]
};

function reducer(state=init,action) {
    switch (action.type){
        case "LOAD_DATA_OWNER_LABEL":{
            let marge = action.value ? action.value : init;
            return {...state,...marge}
        }
        default:{
            return state;
        }
    }
}
export default reducer;