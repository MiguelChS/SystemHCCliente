/**
 * Created by mc185249 on 5/26/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../actions/FiltroPersonAction';
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
                            //props.dispatch(action.filtrar())
                        }}>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <Input
                                        value={props.store.NombreApellido}
                                        label="Nombre o apellido"
                                        placeHolder="Nombre o Apellido"
                                        returnValue={(value)=>{
                                            props.dispatch(action.insertNameLastName(value))
                                        }}
                                    />
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <Input
                                        value={props.store.NumDocumento}
                                        label="n° Documento"
                                        placeHolder="Numero de documento"
                                        returnValue={(value)=>{
                                            props.dispatch(action.insertNumberDocument(value))
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <Select
                                        label="Socio"
                                        id="idSocio"
                                        col={{label:2,input:10}}
                                        dataSource={[{label:"Socio",value:true},{label:"No Socio",value:false}]}
                                        default={props.store.Socio}
                                        returnSelect={(value)=>{
                                            props.dispatch(action.insertSocio(value))
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

const mapStateToProps = (state)=>{
    return {
        store:state.filtroPerson,
        request:state.Layout.request
    }
};

export default connect(mapStateToProps)(Filtro)