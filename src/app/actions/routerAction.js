/**
 * Created by mc185249 on 4/23/2017.
 */
import React from 'react';
import { loadBodyContent } from './LayoutAction';
import UserPage from '../components/page/Usuario/index.jsx';
import UnitsPage from '../components/page/Unidades/index.jsx';
import SalePage from '../components/page/ingreso/venta/index.jsx';
import AportePage from '../components/page/ingreso/Aporte/index.jsx';

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