/**
 * Created by mc185249 on 1/11/2017.
 */
import { combineReducers } from 'redux';

import login from './loginReducer';
import indexPage from './IndexProyec';
import layout from './LayoutReducer';
import formUsuario from './FormUsuarioReducer';
import source from './SourceReducer'
import formUnidades from './formUnidadesReducer';
import formVentas from './FormVentaReducer';
import autoComplete from './AutoCompleteReducer';
import modal from './ModalReducer';
import formPropietario from './FormPropietarioReducer';
import dataLabelPersonal from './DatosPersonalreducer';
import formAporte from './FormAporteReducer';
import formEgreso from './FormEgresoReducer';
import formPago from './FormPagoReducer';
import caja from './CajaReducer';
import StartProject from './InicioProjectoReducer';
import cashFlow from './cashFlowReducer';
import FiltroUnidad from './FiltrosUnidadReducer';
import FiltroPerson from './FiltroPersonaReducer';

export default combineReducers({
    Login:login,
    IndexPage:indexPage,
    Layout:layout,
    FormUsuario:formUsuario,
    Source:source,
    FormUnits:formUnidades,
    FormSale:formVentas,
    AutoComplete:autoComplete,
    Modal:modal,
    FormOwner:formPropietario,
    DataLabelPersonal:dataLabelPersonal,
    FormAporte:formAporte,
    FormEgreso:formEgreso,
    FormPago:formPago,
    Caja:caja,
    cashFlow:cashFlow,
    startProject:StartProject,
    filtroUnidad:FiltroUnidad,
    filtroPerson:FiltroPerson
})