/**
 * Created by mc185249 on 5/26/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import { Select, Input } from '../componentFormulario/index.jsx';
import * as action from '../../../actions/FormUsuarioAction';
import * as lib from '../../../lib/index';


function sendForm(props){
    if(!formComplete()) return;
    props.dispatch([
        action.changeStateSendForm(true),
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
        }}>
            <div className="text-center">
                <p className="mjsErr">{props.store.errMjs}</p>
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
                required={true}
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
            <Input
                value={props.store.importe}
                required={true}
                label="Importe"
                placeHolder="Importe"
                returnValue={(value)=>{
                    if(value.length > 0 && !lib.OnlyNumber(value))return;
                    props.dispatch(action.insertImporte(value))
                }}
            />
            <Select
                label="Tipo Moneda"
                id="idTipoMoneda"
                col={{label:2,input:10}}
                dataSource={props.source.TypeMoney}
                default={props.store.idTipoMoneda}
                required={true}
                returnSelect={(value)=>{
                    props.dispatch(action.insertTypeMoney(value))
                }}
            />
            <div className="hr-line-dashed"></div>
            <div className="form-group">
                <div className="col-sm-4 col-sm-offset-2">
                    <button className="btn btn-primary"
                            disabled={props.store.sendForm}
                            type="submit">Cargar</button>
                </div>
            </div>
        </form>
    )
};

const mapStateToProps = (state)=>{
    return {
        store:state.FormUsuario,
        source:state.Source,
        idUsuario:state.Layout.DataUser.id
    }
};

export default connect()(formulario);