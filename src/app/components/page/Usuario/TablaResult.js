/**
 * Created by mc185249 on 5/26/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../actions/FiltroPersonAction';
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
                                    onClick={()=>{
                                            props.dispatch(action.searchFormulario())
                                         }}
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
                                            onClick={()=>{
                                                props.dispatch(addModal({
                                                body:Formulario,
                                                data:null,
                                                size:"lg"}))
                                            }}
                                            type="button">
                                        Nueva Persona
                                        <i style={{marginLeft:"5px"}} className="fa fa-plus"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Telefono</th>
                                        <th>Mail</th>
                                        <th>Documento</th>
                                        <th>Cantidad de Compras</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {props.tabla.map((obj,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{`${obj.apellido} ${obj.nombre}`}</td>
                                            <td>{obj.telefono}</td>
                                            <td>{obj.mail}</td>
                                            <td>{`${obj.tipoDocu} : ${obj.numeroDocumento}`}</td>
                                            <td>{obj.cantUnits}</td>
                                            <td>
                                                <BtnTable
                                                    data={obj}
                                                    onClick={(form)=>{
                                                        props.dispatch(action.Editar(form,Formulario,props.source.typeDocument))
                                                    }}
                                                    icono="fa-pencil"
                                                />
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
        tabla:state.filtroPerson.tabla,
        error:state.filtroPerson.mjsErr,
        success:state.filtroPerson.mjsSuccess,
        request:state.Layout.request,
        source:state.Source
    }
};
export default connect(mapStateToProps)(TablaResult);