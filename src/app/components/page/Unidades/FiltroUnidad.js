/**
 * Created by mc185249 on 5/26/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../actions/FiltroUnidadAction';
import { Select, Input } from '../componentFormulario/index.jsx';

let Filtro = (props)=>{
    return(
        <div className="row">
            <div className="col-xs-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>filtro<small> SystemHC+</small></h5>
                    </div>
                    <div className="ibox-content">
                        <form className="form-horizontal" onSubmit={(event)=>{
                            event.preventDefault();
                            props.dispatch(action.filtrar())
                        }}>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <Input
                                        value={props.store.unidad}
                                        label="Unidad"
                                        placeHolder="Unidad"
                                        returnValue={(value)=>{
                                            props.dispatch(action.insertUnidad(value))
                                        }}
                                    />
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <Input
                                        value={props.store.piso}
                                        label="Piso"
                                        placeHolder="Piso"
                                        returnValue={(value)=>{
                                            props.dispatch(action.insertPiso(value))
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <Select
                                        label="Orientacion"
                                        id="idOrientacion"
                                        col={{label:2,input:10}}
                                        dataSource={props.source.typeOrientation}
                                        default={props.store.orientacion}
                                        returnSelect={(value)=>{
                                            props.dispatch(action.insertOrientacion(value))
                                        }}
                                    />
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <Select
                                        label="Estado Venta"
                                        id="idEstadoVenta"
                                        col={{label:2,input:10}}
                                        dataSource={[...props.source.StateSale,{label:"No Vendido",value:"No Vendido"}]}
                                        default={props.store.estadoVenta}
                                        returnSelect={(value)=>{
                                            props.dispatch(action.insertVenta(value))
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <div className="btn-group">
                                        <button className="btn btn-xs btn-primary separarButton"
                                                disabled={props.request}
                                                type="submit">
                                            Filtrar
                                            <i style={{marginLeft:"5px"}} className="fa fa-filter"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps =(state)=>{
    return {
        source:state.Source,
        store:state.filtroUnidad,
        request:state.Layout.request
    }
};
export default connect(mapStateToProps)(Filtro);