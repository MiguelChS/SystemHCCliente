/**
 * Created by mc185249 on 4/5/2017.
 */

export function loadSourceUnits(valor) {
    return {
        type:"LOAD_UNITS_SOURCE",
        value:valor
    }
}

export function removeSourceUnits(valor) {
    return {
        type:"REMOVE_UNITS_SOURCE",
        value: valor
    }
}