import React from 'react';
import {InputButton} from '../../componentFormulario/index.jsx';

export default (props)=>{
    return(
        <div className="col-xs-12 col-md-6">
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h5> Datos de propietario <small> SystemHC+</small></h5>
                </div>
                <div className="ibox-content text-center">
                    <div className="row">
                        <div className="col-xs-6">
                            <p><strong>Tipo Documento :</strong> {props.store.typeDocument}</p>
                        </div>
                        <div className="col-xs-6">
                            <p><strong>N° Documento :</strong> {props.store.numberDocument}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <p><strong>Nombre :</strong> {props.store.name}</p>
                        </div>
                        <div className="col-xs-6">
                            <p><strong>Apellido :</strong> {props.store.lastName}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <p><strong>Telefono :</strong> {props.store.phone}</p>
                        </div>
                        <div className="col-xs-6">
                            <p><strong>mail :</strong> {props.store.mail}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}