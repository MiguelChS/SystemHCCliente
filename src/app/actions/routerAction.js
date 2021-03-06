/**
 * Created by mc185249 on 4/23/2017.
 */
import React from 'react';
import { loadBodyContent } from './LayoutAction';
import UserPage from '../components/page/Usuario/index.jsx';
import UnitsPage from '../components/page/Unidades/index.jsx';
import SalePage from '../components/page/ingreso/venta/index.jsx';
import AportePage from '../components/page/ingreso/Aporte/index.jsx';
import Egreso from '../components/page/Egreso/index.jsx';
import Pago from '../components/page/ingreso/Pago/index.jsx';
import Caja from '../components/page/Caja/index';
import InicioProject from '../components/page/InicioProject/index';
import CashFlow from '../components/page/CashFlow/index';

export function pageUser() {
    return loadBodyContent(<UserPage/>)
}
export function pageUnits() {
    return loadBodyContent(<UnitsPage/>)
}
export function pageSale() {
    return loadBodyContent(<SalePage/>)
}
export function pageAporte() {
    return loadBodyContent(<AportePage/>)
}
export function pageEgreso() {
    return loadBodyContent(<Egreso/>)
}
export function pagePago() {
    return loadBodyContent(<Pago/>)
}
export function pageCaja() {
    return loadBodyContent(<Caja/>)
}
export function pageInicioProject() {
    return loadBodyContent(<InicioProject/>)
}
export function pageCashFlow() {
    return loadBodyContent(<CashFlow/>)
}