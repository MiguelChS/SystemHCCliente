/**
 * Created by mc185249 on 4/23/2017.
 */
export function changeShowLeftMenu() {
    return {
        type:"CHANGE_MENU_LEFT_LAYOUT"
    }
}
export function loadDataUser(valor) {
    return {
        type:"LOAD_DATA_USER_LAYOUT",
        value:valor
    }
}
export function loadBodyContent(valor) {
    return {
        type:"LOAD_BODY_CONTENT_LAYOUT",
        value:valor
    }
}