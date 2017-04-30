/**
 * Created by mc185249 on 4/22/2017.
 */
let int = {
    username:"",
    pass:"",
    showMjs:"",
    Btn_search:false
};

function reducer(state=int,action) {
    switch (action.type){
        case "INSERT_USERNAME_LOGIN":{
            return {...state,username:action.value};
        }
        case "CHANGE_SHOW_MJS_LOGIN":{
            return {...state,showMjs:action.value};
        }
        case "INSERT_PASS_LOGIN":{
            return {...state,pass:action.value};
        }
        case "CHANGE_DISABLED_LOGIN":{
            return {...state,Btn_search:!state.Btn_search}
        }
        default:{
            return state;
        }
    }
}

export default reducer;