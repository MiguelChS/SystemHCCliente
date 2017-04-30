/**
 * Created by mc185249 on 4/22/2017.
 */
let init = {
    bodyRender:null,
    login:false,
};

function reducer(state=init,action) {
    switch (action.type){
        case "SWITCH_PAGE_INDEX":{
            return {...state,bodyRender:action.value}
        }
        case "SWITCH_LOGIN_STATE":{
            return {...state,login:action.value}
        }
        default:{
            return{...state}
        }
    }
}

export default reducer;
