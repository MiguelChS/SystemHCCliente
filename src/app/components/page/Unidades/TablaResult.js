/**
 * Created by mc185249 on 5/26/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../actions/FiltroUnidadAction';
import BtnTable from './btnTable';
import { addModal } from '../../../actions/modalAction';
import Formulario from './Formulario';

let TablaResult = (props)=>{
    return(
        <div className="row">
            <div className="col-xs-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Tabla resultado<small> SystemHC+</small></h5>
                        <div className="ibox-tools">
                            <button className="btn btn-xs btn-primary separarButton"
                                    disabled={props.request}
                                    onClick={()=>{props.dispatch(action.searchFormulario())}}
                                >
                                <i className="fa fa-refresh"/>
                            </button>
                        </div>
                    </div>
                    <div className="ibox-content">
                        <div className="row text-center">
                            <p className="mjsErr">{props.error}</p>
                            <p className="mjsSuccess">{props.success}</p>
                        </div>
                        <div className="row">
                            <div className="col-sm-9 m-b-xs">
                                <div className="btn-group-xs">
                                    <button className="btn btn-xs btn-primary separarButton"
                                            disabled={props.request}
                                            onClick={()=>{props.dispatch(addModal({
                                                body:Formulario,
                                                data:null,
                                                size:"lg"}))}}
                                            type="button">
                                        Nueva unidad
                                        <i style={{marginLeft:"5px"}} className="fa fa-plus"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Piso</th>
                                    <th>Unidad</th>
                                    <th>Orientacion</th>
                                    <th>Caracteristicas</th>
                                    <th>Superficie</th>
                                    <th>Balcon terraza</th>
                                    <th>Terreza externa</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {props.tabla.map((obj,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{obj.piso}</td>
                                            <td>{obj.unidad}</td>
                                            <td>{obj.orientacion}</td>
                                            <td>{obj.caracteristicas}</td>
                                            <td>{obj.superficieCubierta}</td>
                                            <td>{obj.Balcon_terraza}</td>
                                            <td>{obj.terraza_externa}</td>
                                            <td>{obj.estado}</td>
                                            <td>
                                                <BtnTable
                                                    data={obj}
                                                    onClick={(form)=>{props.dispatch(action.Editar(form,Formulario,props.source.typeOrientation))}}
                                                    icono="fa-pencil"
                                                />
                                                {(()=>{
                                                    if(obj.estado != "No Vendido") return null;
                                                    return(
                                                        <BtnTable
                                                            data={obj}
                                                            onClick={(form)=>{ props.dispatch(action.Delete(form._id))}}
                                                            icono="fa-trash"
                                                        />
                                                    )
                                                })()}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps =(state)=>{
    return {
        tabla:state.filtroUnidad.tabla,
        error:state.filtroUnidad.mjsErr,
        success:state.filtroUnidad.mjsSuccess,
        request:state.Layout.request,
        source:state.Source
    }
};
export default connect(mapStateToProps)(TablaResult);