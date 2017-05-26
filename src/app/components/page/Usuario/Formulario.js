/**
 * Created by mc185249 on 5/26/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import { Select, Input } from '../componentFormulario/index.jsx';
import * as action from '../../../actions/FormUsuarioAction';
import * as lib from '../../../lib/index';
import { hiddenModal} from '../../../actions/modalAction';


function sendForm(props){
    if(!formComplete(props.store)) return;
    props.dispatch([
        action.sendUsuario(props.store,props.idUsuario)
    ]);
}
function formComplete(form){
    return (form.name && form.lastName && form.telefono && form.numDocumento && form.idTipoDocumento);
}

let formulario = (props)=>{
    return(
        <form className="form-horizontal" onSubmit={(event)=>{
            event.preventDefault();
            sendForm(props)
        }}>
            <h5> Persona <small> SystemHC+</small></h5>
            <div className="hr-line-dashed"></div>
            <div className="text-center">
                <p className="mjsErr">{props.store.errMjs}</p>
                <p className="mjsSuccess">{props.store.mjsSuccess}</p>
            </div>
            <Input
                value={props.store.name}
                required={true}
                label="Nombre"
                placeHolder="Nombre"
                returnValue={(value)=>{
                    props.dispatch(action.insertName(value))
                }}
            />
            <Input
                value={props.store.lastName}
                required={true}
                label="Apellido"
                placeHolder="Apellido"
                returnValue={(value)=>{
                    props.dispatch(action.insertLastName(value))
                }}
            />
            <Input
                value={props.store.telefono}
                required={true}
                label="Telefono"
                placeHolder="Telefono"
                returnValue={(value)=>{
                    if(value.length > 0 && !lib.OnlyNumber(value))return;
                    props.dispatch(action.insertPhone(value))
                }}
            />
            <Input
                value={props.store.mail}
                label="Mail"
                placeHolder="Mail"
                returnValue={(value)=>{
                    props.dispatch(action.insertMail(value))
                }}
            />
            <Select
                label="Tipo Documento"
                id="TipoDocumento"
                col={{label:2,input:10}}
                dataSource={props.source.typeDocument}
                default={props.store.idTipoDocumento}
                required={true}
                returnSelect={(value)=>{
                    props.dispatch(action.insertTypeDocument(value))
                }}
            />
            <Input
                value={props.store.numDocumento}
                required={true}
                label="Numero de Documento"
                placeHolder="n° Documento"
                returnValue={(value)=>{
                    props.dispatch(action.insertNumberDocument(value))
                }}
            />
            <div className="hr-line-dashed"></div>
            <div className="form-group">
                <div className="col-xs-12 text-right">
                    <button className="btn btn-primary separarButton"
                            disabled={props.request}
                            type="submit">Cargar</button>
                    <button className="btn btn-primary separarButton"
                            type="button"
                            disabled={props.request}
                            onClick={()=>{
                                props.dispatch([
                                    action.insertSUCCESS(""),
                                    action.insertERR(""),
                                    action.clearForm(),
                                    hiddenModal(props.idModal)
                                ])
                            }}>
                        Cerrar
                    </button>
                </div>
            </div>
        </form>
    )
};

const mapStateToProps = (state)=>{
    return {
        store:state.FormUsuario,
        source:state.Source,
        idUsuario:state.Layout.DataUser.id,
        request:state.Layout.request
    }
};

export default connect(mapStateToProps)(formulario);